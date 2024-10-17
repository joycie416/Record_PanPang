import Link from "next/link";
import { fetchCurrentUser } from "@/utils/supabase/server-actions";
import { buttonVariants } from "@/components/ui/button";
import PostList from "@/components/features/post/PostList";
import Plus from "./(assets)/Plus";

export default async function Home() {
  const user = await fetchCurrentUser();

  return (
    <>
      <PostList user={user} />
      <Link
        href="/write"
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:shadow-2xl ${buttonVariants({
          size: "icon"
        })}`}
      >
        <Plus style={{ fill: "white", width: "20px" }} />
      </Link>
    </>
  );
}
