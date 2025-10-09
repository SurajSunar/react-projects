import { Post } from "@/types/post";
import React from "react";

const getPost = async (id: string) => {
  try {
    const results = await fetch("http://localhost:3000/api/posts/" + id, {
      cache: "no-store",
    });
        console.log('results', results)

    const post = results.json();
    return post;
  } catch (error) {
    console.log('error', error)
  }
};

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const post: Post = await getPost(params.id);

  return (
    <div>
      {
        <>
          <div>{post.id}</div>
          <div>{post.title}</div>
          <div>{post.description}</div>
        </>
      }
    </div>
  );
}
