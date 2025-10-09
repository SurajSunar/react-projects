import { POSTS } from "@/data/posts";

export async function GET() {

  return new Response(JSON.stringify(POSTS), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}