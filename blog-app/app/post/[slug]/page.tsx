import Postdetail from "@/components/post/post-detail";

const PostDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  return (
    <div className="flex justify-center mt-10">
      <Postdetail slug={slug} />
    </div>
  );
};

export default PostDetailPage;
