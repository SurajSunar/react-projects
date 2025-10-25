import PostEditForm from "@/components/post/post-edit-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  return (
    <main>
      <div className="w-full max-w-4xl p-4 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <PostEditForm slug={slug} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default EditPostPage;
