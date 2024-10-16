import Link from "next/link";
import { fetchCurrentUser } from "@/utils/supabase/server-actions";
import { buttonVariants } from "@/components/ui/button";
import PostList from "@/components/features/post/PostList";

export default async function Home() {
  const user = await fetchCurrentUser();

  return (
    <>
      <div className="container mx-auto">
        <PostList user={user} />
      </div>
      <Link href="/write" className={`fixed bottom-6 right-6 ${buttonVariants({ size: "icon" })}`}>
        +
      </Link>
    </>
  );
}
