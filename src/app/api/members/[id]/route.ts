// src/app/api/members/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Next.js এর নিয়ম অনুযায়ী params কে await করে id বের করা হলো
        const resolvedParams = await params;
        const id = resolvedParams.id;

        const body = await req.json();
        const { name, role, deposit } = body;

        // ডাটাবেসে ইউজারের তথ্য আপডেট করা
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                name,
                role,
                deposit: Number(deposit),
            },
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
// src/app/api/members/[id]/route.ts
// (আগের PATCH ফাংশনটি যেমন আছে তেমনই থাকবে, তার নিচে এটি পেস্ট করুন)

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js এর নিয়ম অনুযায়ী params কে await করে id বের করা হলো
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // ডাটাবেস থেকে মেম্বারকে ডিলিট করা
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