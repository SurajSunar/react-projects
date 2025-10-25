import PostForm from "@/components/post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditPostPage = () => {
  return (
    <main>
      <div className="w-full max-w-4xl p-4 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default EditPostPage;
