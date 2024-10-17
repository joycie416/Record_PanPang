"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const Background = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  let backgroundColor = "bg-white";

  if (["/sign-in", "/sign-up"].includes(path)) {
    backgroundColor = "bg-gray-700";
  }

  return (
    <main className={`grow py-14 ${backgroundColor}`}>
      <div className="container">{children}</div>
    </main>
  );
};

export default Background;
