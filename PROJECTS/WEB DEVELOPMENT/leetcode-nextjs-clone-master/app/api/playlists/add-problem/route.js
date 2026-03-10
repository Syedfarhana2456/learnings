import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
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

    const { problemId, playlistId } = await request.json();

    if (!problemId || !playlistId) {
      return NextResponse.json(
        { success: false, error: "Problem ID and playlist ID are required" },
        { status: 400 }
      );
    }

    // Verify playlist belongs to user
    const playlist = await db.playlist.findFirst({
      where: {
        id: playlistId,
        userId: dbUser.id,
      },
    });

    if (!playlist) {
      return NextResponse.json(
        { success: false, error: "Playlist not found or unauthorized" },
        { status: 404 }
      );
    }

    // Add problem to playlist
    const problemInPlaylist = await db.problemInPlaylist.create({
      data: {
        problemId,
        playlistId,
      },
    });

    return NextResponse.json({
      success: true,
      data: problemInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problem to playlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add problem to playlist" },
      { status: 500 }
    );
  }
}