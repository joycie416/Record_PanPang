import Link from "next/link";
import { fetchCurrentUser } from "@/utils/supabase/server-actions";
import { getSpotifyToken } from "@/utils/spotify-actions";
import { buttonVariants } from "@/components/ui/button";
import PostList from "@/components/features/post/PostList";

export default async function Home() {
  const user = await fetchCurrentUser();
  const token: string = await getSpotifyToken();

  return (
    <>
      <div className="container items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] mx-auto">
        <PostList user={user} token={token} />
      </div>
      <Link href="/write" className={`fixed bottom-6 right-6 ${buttonVariants({ size: "icon" })}`}>
        +
      </Link>
    </>
  );
}
