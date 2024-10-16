"use client";

import { useState } from "react";
import MyComment from "./MyComment";

const MyPageTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "게시글" },
    { id: 2, label: "댓글", component: <MyComment /> },
    { id: 3, label: "좋아요" }
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
