// /api/comments/route.js
import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import CommentModel from "@/lib/models/CommentModel";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req) {
  const token = await getToken({ req, secret });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ConnectDB();
  const body = await req.json();

  try {
    if (body.commentId && body.reply) {
      // Add a reply to an existing comment
      const comment = await CommentModel.findById(body.commentId);
      comment.replies.push({
        userId: token.sub,
        name: token.name || "Anonymous",
        content: body.reply,
      });
      await comment.save();
      return NextResponse.json(comment);
    } else {
      // Create new comment
      const newComment = await CommentModel.create({
        blogId: body.blogId,
        userId: token.sub,
        name: token.name || "Anonymous",
        content: body.content,
      });
      return NextResponse.json(newComment);
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  await ConnectDB();
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get("blogId");
  const comments = await CommentModel.find({ blogId }).sort({ createdAt: -1 });
  return NextResponse.json(comments);
}
