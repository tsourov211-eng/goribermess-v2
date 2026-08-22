// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma), // Prisma-কে NextAuth-এর সাথে যুক্ত করা হলো
    providers: [
        // 1. Google Login Setup
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        // 2. Email & Password Login Setup
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("ইমেইল এবং পাসওয়ার্ড দিন!");
                }

                // ডাটাবেস থেকে ইউজার খোঁজা
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    throw new Error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি!");
                }

                // পাসওয়ার্ড চেক করা
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    throw new Error("পাসওয়ার্ড ভুল হয়েছে!");
                }

                // লগইন সফল হলে ইউজারের তথ্য ফেরত দেওয়া
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role, // ডাটাবেস থেকে রোল নেওয়া
                };
            }
        })
    ],
    callbacks: {
        // Session-এ ইউজারের রোল ও আইডি যুক্ত করা (যাতে ড্যাশবোর্ডে আমরা রোল চেক করতে পারি)
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login', // আমাদের কাস্টম লগইন পেজ
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };