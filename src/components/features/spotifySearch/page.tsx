"use client";

import React, { useState } from "react";

const SpotifySearch = () => {
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  console.log("search", search);

  return (
    <div>
      <input
        className="border-2 border-black"
        type="text"
        placeholder="노래를 검색해주세요"
        value={search}
        onChange={handleInputChange}
      />

      <button>버튼</button>
    </div>
  );
};

export default SpotifySearch;
