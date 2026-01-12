import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ตรวจสอบว่า admin user มีอยู่หรือไม่
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("✅ Admin user created:", admin.email);
  } else {
    console.log("✅ Admin user already exists");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
