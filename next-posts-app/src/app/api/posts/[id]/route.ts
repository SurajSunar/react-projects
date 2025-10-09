import { POSTS } from "@/data/posts";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
   
    const post = params.id && POSTS.find(post => post.id === +params.id)

  return new Response(JSON.stringify(post || {message: 'Post not found'}), {
    status: post ? 200 : 404,
    headers: { "Content-Type": "application/json" }
  });
}