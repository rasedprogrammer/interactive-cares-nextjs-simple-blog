import { NextResponse } from "next/server";
import ConnectDB from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModels";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  await ConnectDB();

  try {
    const blog = await BlogModel.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch blog: ${error.message}` },
      { status: 500 }
    );
  }
}
