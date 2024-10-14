import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import PostList from "@/components/features/post/PostList";

export default async function Home() {
  return (
    <>
      <div className="container items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] mx-auto">
        <PostList />
      </div>
      <Link href="/write" className={`fixed bottom-6 right-6 ${buttonVariants({ size: "icon" })}`}>
        +
      </Link>
    </>
  );
}
