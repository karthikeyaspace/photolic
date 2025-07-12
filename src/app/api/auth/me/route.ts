import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "") || request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Find session in database
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: { user: true },
    });

    if (!session || session.expires < new Date()) {
      // Clean up expired session
      if (session) {
        await prisma.session.delete({
          where: { sessionToken: token },
        });
      }
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const { user } = session;
    
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      credits: user.credits || 0,
    });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
