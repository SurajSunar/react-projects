import { Post } from '@/types/post';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Posts',
  description: 'List of all posts'
}

 const getPosts = async() => {
    const results = await fetch('http://localhost:3000/api/posts');
    const posts = results.json()

    return posts;
  }

export default async function Posts() {
  const posts: Post[] = await getPosts();

  return (
    <div>
      {
        posts.map(post => <div  key={post.id}>{post.title}</div>)
      }
    </div>
  )
}

