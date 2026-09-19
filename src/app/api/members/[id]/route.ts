import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    const body = await req.json();
    const { name, role, phone } = body;

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    if (role) dataToUpdate.role = role;
    if (phone !== undefined) dataToUpdate.phone = phone;

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: dataToUpdate,
    });

    return NextResponse.json(
      { message: "মেম্বারের তথ্য সফলভাবে আপডেট হয়েছে!", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: "আপডেট করতে কোনো সমস্যা হয়েছে!" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "মেম্বার সফলভাবে রিমুভ হয়েছে!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "ডিলিট করতে কোনো সমস্যা হয়েছে!" },
      { status: 500 }
    );
  }
}