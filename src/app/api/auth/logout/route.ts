import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || request.cookies.get("auth_token")?.value;

    if (token) {
      // Delete session from database
      await prisma.session.deleteMany({
        where: { sessionToken: token },
      });
    }

    // Clear the cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_token", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Error in logout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
