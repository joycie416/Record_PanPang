"use client";

import { useEffect, useState } from "react";
import MyComment from "./MyComment";
import useSpotifyStore from "@/store/spotifyStore";
import MyLike from "./MyLike";

const MyPageTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { setToken } = useSpotifyStore();

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientPW = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    const fetchToken = async () => {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        cache: "no-store",
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientPW}`
      });
      if (!res.ok) {
        throw new Error("Failed to fetch token");
      }
      const data = await res.json();

      const { access_token: token } = data;

      setToken(token);
    };
    fetchToken();
  }, []);

  const tabs = [
    { id: 1, label: "게시글" },
    { id: 2, label: "댓글", component: <MyComment /> },
    { id: 3, label: "좋아요", component: <MyLike /> }
  ];

  return (
    <div className="max-w-full mx-auto">
      <ul className="flex justify-around border-b border-gray-300 my-4">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`w-full text-center py-2 cursor-pointer ${
              activeTab === tab.id
                ? "border-b-2 border-sky-400 text-sky-400 font-semibold"
                : "text-gray-400 active:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="p-4">{tabs.find((tab) => tab.id === activeTab)?.component}</div>
    </div>
  );
};

export default MyPageTabs;
