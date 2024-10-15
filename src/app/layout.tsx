import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import SignOutButton from "@/components/features/auth/signOutButton";
import Providers from "@/components/providers/QueryClientProvider";
import { fetchCurrentUser } from "@/utils/supabase/server-actions";
import ProfileImg from "@/components/features/navbar/ProfileImg";
import { createClient } from "@/utils/supabase/server";

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
  const user = await fetchCurrentUser();

  const supabase = createClient();
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("onAuthStateChange :", event, session);

    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      // handle sign in event
    } else if (event === "SIGNED_OUT") {
      // handle sign out event
    } else if (event === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  // call unsubscribe to remove the callback
  data.subscription.unsubscribe();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <header className={`bg-gray-700 text-gray-300 h-[56px] sticky top-0 left-0 right-0`}>
            <div className="container h-full flex justify-between items-center py-2 px-4 mx-auto">
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
                      <ProfileImg />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
