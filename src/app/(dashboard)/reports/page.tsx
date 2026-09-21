import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ReportsView from "@/components/ReportsView";
import AdminReportsView from "@/components/AdminReportsView";
import { redirect } from "next/navigation";

export default async function ReportsPage() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        redirect("/login");
    }

    // Admin and Manager see the comprehensive member-wise reports
    if (user.role === "admin" || user.role === "manager") {
        return <AdminReportsView />;
    }

    // Regular members see their own personal reports
    return <ReportsView />;
}