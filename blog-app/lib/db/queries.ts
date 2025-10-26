import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { post } from "./schema";

export async function getPosts() {
  try {
    const posts = await db.query.post.findMany({
      orderBy: desc(post.createdAt),
      with: {
        author: true,
      },
    });

    return {
      posts,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in getting all posts",
    };
  }
}

export async function getPost(slug: string) {
  const queryPost = await db.query.post.findFirst({
    where: eq(post.slug, slug),
    with: {
      author: true,
    },
  });

  return queryPost;
}
