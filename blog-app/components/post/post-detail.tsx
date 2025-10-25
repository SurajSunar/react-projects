import { db } from "@/lib/db";
import { post } from "@/lib/db/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { Pencil } from "lucide-react";
import Link from "next/link";

export async function getPost(slug: string) {
  const queryPost = await db.query.post.findFirst({
    where: eq(post.slug, slug),
    with: {
      author: true,
    },
  });

  return queryPost;
}

const Postdetail = async ({ slug }: { slug: string }) => {
  const post = await getPost(slug);

  return (
    <div className="flex flex-col rounded w-full max-w-md border border-gray-200 p-4">
      <h1 className="text-2xl font-bold border-b border-b-gray-200 pb-2 flex justify-between">
        {post?.title}
        <Link href={`/post/edit/${slug}`}>
          <Pencil />
        </Link>
      </h1>
      <div className="py-2 space-y-2">
        <p>{post?.description}</p>
        <p>{post?.content}</p>
      </div>
      <div className="flex justify-between border-t border-t-gray-200 pt-2">
        <p>{post?.author.name}</p>
        <p>{dayjs(post?.createdAt).format("DD/MM/YYYY")}</p>
      </div>
    </div>
  );
};

export default Postdetail;
