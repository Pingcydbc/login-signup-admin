import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // ตรวจสอบว่า user ต้องเป็น ADMIN
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "คุณไม่มีสิทธิ์ในการแก้ไข" },
        { status: 403 }
      );
    }

    const { name, email, password } = await req.json();
    const userId = parseInt(id);

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "ไม่พบผู้ใช้" },
        { status: 404 }
      );
    }

    // ตรวจสอบว่าอีเมลไม่ซ้ำกับผู้ใช้อื่น
    if (email && email !== user.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return NextResponse.json(
          { message: "อีเมลนี้มีอยู่ในระบบแล้ว" },
          { status: 400 }
        );
      }
    }

    // อัปเดตข้อมูล
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(
      { message: "อัปเดตสำเร็จ", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { message: error?.message || "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    // ตรวจสอบว่า user ต้องเป็น ADMIN
    if (!session || (session.user as any)?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "คุณไม่มีสิทธิ์ในการลบ" },
        { status: 403 }
      );
    }

    const userId = parseInt(id);

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: "ไม่พบผู้ใช้" },
        { status: 404 }
      );
    }

    // ลบผู้ใช้
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "ลบสำเร็จ" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { message: error?.message || "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
