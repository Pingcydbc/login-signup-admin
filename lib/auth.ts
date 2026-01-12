import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // ค้นหา User ในฐานข้อมูล
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("ไม่พบอีเมลนี้ในระบบ");

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("รหัสผ่านไม่ถูกต้อง");

        // ส่งข้อมูลกลับไป
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // เพิ่ม role เข้าไปใน Token
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // เพิ่ม role เข้าไปใน Session เพื่อให้หน้าเว็บเรียกใช้ได้
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
};
