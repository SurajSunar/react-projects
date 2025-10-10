import { POSTS } from "@/data/posts";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string; }> }) {

    const id = (await params).id;
   
    const post = id && POSTS.find(post => post.id === +id)

  return new Response(JSON.stringify(post || {message: 'Post not found'}), {
    status: post ? 200 : 404,
    headers: { "Content-Type": "application/json" }
  });
}