import { getPost } from "@/lib/db/queries";
import PostForm from "./post-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PostEditForm = async ({ slug }: { slug: string }) => {
  const post = await getPost(slug);

  const author = await auth.api.getSession({
    headers: await headers(),
  });

  if (author?.user.id == post?.authorId) {
    redirect("/");
  }

  return (
    <div>
      <PostForm editablePost={post} />
    </div>
  );
};

export default PostEditForm;
