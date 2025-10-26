import { auth } from "@/lib/auth";
import { deletePost, getPost } from "@/lib/db/queries";
import dayjs from "dayjs";
import { Pencil, Trash2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";
import PostDeleteBtn from "./post-delete-btn";

const Postdetail = async ({ slug }: { slug: string }) => {
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const author = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthor = author?.user.id == post.authorId;

  return (
    <div className="flex flex-col rounded w-full max-w-md border border-gray-200 p-4">
      <h1 className="text-2xl font-bold border-b border-b-gray-200 pb-2 flex justify-between">
        <span>{post?.title}</span>
        {isAuthor && (
          <div className="flex gap-2">
            <Link href={`/post/edit/${slug}`}>
              <Pencil />
            </Link>
            <PostDeleteBtn id={post.id} />
          </div>
        )}
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
