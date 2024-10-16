import MyPageTabs from "@/components/features/mypage/MyPageTabs";
import Profile from "@/components/features/mypage/profile";
import { Metadata } from "next";
import { fetchCurrentUser } from "@/utils/supabase/server-actions";
import { getSpotifyToken } from "@/utils/spotify-server";

export const metadata: Metadata = {
  title: "RPP 마이페이지",
  description: "RPP 마이페이지"
};

const MyPage = async () => {
  const user = await fetchCurrentUser();
  const token: string = await getSpotifyToken();

  if (!user) {
    return <div>사용자 정보가 없습니다. 로그인이 필요합니다.</div>;
  }

  return (
    <div className="container mx-auto">
      <Profile />
      <MyPageTabs user={user} token={token} />
    </div>
  );
};

export default MyPage;
