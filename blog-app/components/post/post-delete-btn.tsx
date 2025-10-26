"use client";

import { deletePost } from "@/actions/post/post-actions";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const PostDeleteBtn = ({ id }: { id: number }) => {
  const removePost = async () => {
    const formData = new FormData();
    formData.append("id", `${id}`);

    const deletedPost = await deletePost(formData);

    if (!!deletedPost) {
      toast.success("Post deleted successfully");
      redirect("/");
    } else {
      toast.error("Error in deleting the post");
    }
  };

  return (
    <>
      <Trash2 onClick={removePost} />
    </>
  );
};

export default PostDeleteBtn;
