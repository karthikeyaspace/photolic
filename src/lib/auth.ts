import { cookies } from "next/headers";
import { prisma } from "./db";

export async function getServerAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
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
      return null;
    }

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    };
  } catch (error) {
    console.error("Error in getServerAuth:", error);
    return null;
  }
}
