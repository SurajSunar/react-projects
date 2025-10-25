import { getPost } from "./post-detail";
import PostForm from "./post-form";

const PostEditForm = async ({ slug }: { slug: string }) => {
  const post = await getPost(slug);
  return (
    <div>
      <PostForm editablePost={post} />
    </div>
  );
};

export default PostEditForm;
