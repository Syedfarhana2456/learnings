import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Get user's playlists
    const playlists = await db.playlist.findMany({
      where: { userId: dbUser.id },
      include: {
        problems: {
          include: {
            problem: {
              select: {
                id: true,
                title: true,
                difficulty: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      playlists,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch playlists" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    // Create new playlist
    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId: dbUser.id,
      },
    });

    return NextResponse.json({
      success: true,
      playlist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create playlist" },
      { status: 500 }
    );
  }
}