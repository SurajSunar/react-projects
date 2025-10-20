import React, { use } from "react";

interface Post {
  title: string;
  body: string;
  tags: string[];
}

export const getPosts = async () => {
  const results = await fetch("https://dummyjson.com/posts");
  return results.json();
};

const Posts = () => {
  const { posts } = use(getPosts());

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {posts.map((post) => (
        <div className="p-4 bg-amber-100 space-y-2 flex flex-col justify-between">
          <p className="text-2xl font-bold">{post.title}</p>
          <p>{post.body}</p>
          <div className="flex gap-1">
            {post.tags.map((tag) => (
              <div key={tag} className="p-2 bg-amber-200">
                {tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
