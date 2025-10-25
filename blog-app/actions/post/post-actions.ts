"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createPost(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must login to create post",
      };
    }

    //get form data
    const title = formData.get("title") as string;
    const description = formData.get("description");
    const content = formData.get("content");

    //validation check

    const slug = (title || "")?.replaceAll(" ", "-");

    const existingPost = await db.query.post.findFirst({
      where: eq(post.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message: "Title already exist. Try different title",
      };
    }

    const [newPost] = await db
      .insert(post)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    revalidatePath("/");
    revalidatePath("/post/" + slug);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: "Error in creating post",
    };
  }
}

export async function updatePost(formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must login to edit post",
      };
    }

    //get form data
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description");
    const content = formData.get("content");
    const slug = formData.get("slug");

    const [editPost] = await db
      .update(post)
      .set({ title, description, content })
      .where(eq(post.id, id))
      .returning();

    revalidatePath("/");
    revalidatePath("/post/" + slug);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post edited successfully",
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: "Error in editing post",
    };
  }
}
