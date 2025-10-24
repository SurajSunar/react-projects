import { getPosts } from "@/lib/db/queries";
import { post } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import dayjs from "dayjs";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  createdAt: Date;
  author: {
    name: string;
  };
}

const Postlist = async () => {
  const { posts } = (await getPosts()) as unknown as { posts: Post[] };

  return (
    <div className="grid grid-cols-4 gap-4 m-4">
      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <Link className="hover:underline" href={`post/${post.slug}`}>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <p>{post.content}</p>
              <p className="flex justify-between text-sm text-muted-foreground">
                <span>{post.author.name}</span>
                <span>{dayjs(post.createdAt).format("DD/MM/YYYY")}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Postlist;
