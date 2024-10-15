import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import SignOutButton from "@/components/features/auth/signOutButton";
import { createClient } from "@/utils/supabase/server";
import Providers from "@/components/providers/QueryClientProvider";
import NavBar from "@/components/commonUI/NavBar";
import { fetchCurrentUser, getPublicUrl } from "@/utils/supabase/server-actions";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: "Record PanPang",
  description: "Share your music at Record PanPang"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const user = await fetchCurrentUser();
  console.log("root layout :", user);

  const {data : {publicUrl: userImg}} = supabase.storage.from('profiles').getPublicUrl(user?.user_metadata.profile_img)
  console.log('userImg :', userImg)

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavBar>
          <Link href={"/"}>Home</Link>
          <ul className="flex gap-4 items-center">
            {!user ? (
              <>
                <li>
                  <Link href={"/sign-in"}>로그인</Link>
                </li>
                <li>
                  <Link href={"/sign-up"}>회원가입</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <SignOutButton />
                </li>
                <li className="flex gap-4 items-center">
                  <Link href={"/mypage"}>
                  <p>Profile</p>
                  </Link>
                  <Link href={"/mypage"} className="min-w-fit min-h-fit rounded-full">
                  <Image src={userImg} alt='프로필 이미지' width={40} height={40} className="w-[40px] h-[40px] border-2 rounded-full aspect-auto object-cover"/></Link>
                </li>
              </>
            )}
          </ul>
        </NavBar>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
