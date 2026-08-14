import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.title || !body.contentHtml) {
      return NextResponse.json({ success: false, error: "Title and content are required" }, { status: 400 });
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newPost = await BlogPost.create({
      ...body,
      slug,
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
