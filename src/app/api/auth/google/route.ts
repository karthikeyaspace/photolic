import { NextRequest, NextResponse } from "next/server";
import env from "@/lib/env";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  id: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    // Initial request - redirect to Google OAuth
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", env.GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.set("redirect_uri", `${env.AUTH_URL}/api/auth/google`);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid email profile");

    return NextResponse.redirect(googleAuthUrl.toString());
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${env.AUTH_URL}/api/auth/google`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for tokens");
    }

    const tokens = await tokenResponse.json();

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to get user info");
    }

    const googleUser = await userResponse.json();

    // Save or update user in database
    const user = await saveUserToDatabase(googleUser);

    // Generate session token
    const sessionToken = generateSessionToken();

    // Save session to database
    await saveSession(sessionToken, user.id);

    // Set cookie and redirect to create page
    const response = NextResponse.redirect(`${env.AUTH_URL}/create`);
    response.cookies.set("auth_token", sessionToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(`${env.AUTH_URL}/login?error=auth_failed`);
  }
}

async function saveUserToDatabase(googleUser: GoogleUser) {
  const { prisma } = await import("@/lib/db");

  const user = await prisma.user.upsert({
    where: { email: googleUser.email },
    update: {
      name: googleUser.name,
      image: googleUser.picture,
    },
    create: {
      email: googleUser.email,
      name: googleUser.name,
      image: googleUser.picture,
      credits: 2,
    },
  });

  return user;
}

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function saveSession(token: string, userId: string) {
  const { prisma } = await import("@/lib/db");

  // Clean up old sessions for this user
  await prisma.session.deleteMany({
    where: { userId },
  });

  // Create new session
  await prisma.session.create({
    data: {
      sessionToken: token,
      userId,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });
}
