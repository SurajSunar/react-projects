"use client";

import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useTransition } from "react";
import { da } from "zod/v4/locales";
import { createPost } from "@/actions/post/post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const postSchema = z.object({
  title: z.string().min(4, "Must be min of 4 char").max(20, "Max of 20 chars"),
  description: z
    .string()
    .min(10, "Must be min of 10 char")
    .max(50, "Max of 50 chars"),
  content: z
    .string()
    .min(10, "Must be min of 10 char")
    .max(200, "Max of 200 chars"),
});

type CreatePostValues = z.infer<typeof postSchema>;

const PostForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const onSubmit = (data: CreatePostValues) => {
    try {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        const res = await createPost(formData);

        if (res.success) {
          toast.success("Post created successfully");
          router.refresh();
          router.push("/");
        }
      });
    } catch (error) {}
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          disabled={isPending}
        />
        {errors?.title && (
          <p className="text-red-500 text-sm">{errors?.title.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="title">Description</Label>
        <Input
          id="description"
          placeholder="Enter post description"
          {...register("description")}
          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-red-500 text-sm">{errors?.description.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Enter post content"
          {...register("content")}
          disabled={isPending}
        />
        {errors?.content && (
          <p className="text-red-500 text-sm">{errors?.content.message}</p>
        )}
      </div>
      <div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
