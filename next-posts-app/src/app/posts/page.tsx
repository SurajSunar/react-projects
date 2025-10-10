import { Post } from "@/types/post";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Posts",
  description: "List of all posts",
};

const getPosts = async () => {
  const results = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/posts");
  const posts = results.json();

  return posts;
};

export default async function Posts() {
  const posts: Post[] = await getPosts();

  return (
    <div className="m-4 flex gap-4">
      {posts.map((post) => (
        <div key={post.id} className="w-[200px] h-[200px]  border border-gray-100 flex justify-between flex-col [&_div]:p-2">
          <div className=" bg-amber-200">{post.title}</div>
          <div>{post.description}</div>
          <Link href={"posts/" + post.id} className="bg-amber-100 w-full hover:underline">
            <div className="float-right">{'>>'}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
