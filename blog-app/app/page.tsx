import Postlist from "@/components/post/post-list";
import { getPosts } from "@/lib/db/queries";

export const metadata = {
  title: "All posts",
  description: "Display all post with latest on top",
};

export default async function Home() {
  return (
    <div className="max-w-8xl mx-auto">
      <Postlist />
    </div>
  );
}
