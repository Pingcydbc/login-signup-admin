import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // ตรวจสอบว่า user ต้องเป็น ADMIN
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "คุณไม่มีสิทธิ์" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
