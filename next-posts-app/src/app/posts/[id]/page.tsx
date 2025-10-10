import { POSTS } from "@/data/posts";
import { Post } from "@/types/post";
import { Metadata } from "next";
import React from "react";

export const dynamic= 'error';
export const dynamicParams = false;

const getPost = async (id: string) => {
  try {
    const results = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/posts/" + id, {
      next: {revalidate: 60},
    });

    const post = results.json();
    return post;
  } catch (error) {
    console.log('error', error)
  }
};

// ✅ Generate static params for pre-rendering pages
export async function generateStaticParams() {
  return POSTS.map((post) => ({
    id: post.id.toString(),
  }));
}

// ✅ Generate metadata dynamically
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
      const { id } = await params;
  const post: Post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post does not exist",
    };
  }

  return {
    title: post.title,
    description: post.description?.slice(0, 150), // short description
    openGraph: {
      title: post.title,
      description: post.description?.slice(0, 150),
      type: "article",
    },
  };
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
    const { id } = await params;
  const post: Post = await getPost(id);

  return (
    <div className="flex justify-center  h-screen">
      {
        <div className="w-1/2 mt-20">
          <div className="text-2xl border-b border-gray-200 p-4 flex gap-10 bg-gradient-to-r from-orange-300 via-orange-200 to-orange-200"><div className="rounded-full bg-orange-200 w-8 h-8 flex justify-center items-center">{post.id}</div>{post.title}</div>
          <div className="p-4 min-h-[200px] bg-gray-100">{post.description}</div>
        </div>
      }
    </div>
  );
}
