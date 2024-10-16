import React from "react";

const Footer = ({ className }: { className: string }) => {
  return (
    <footer className={"w-full h-32 bg-gray-700 flex flex-col justify-center items-center text-gray-300 " + className}>
      <h1>2조 송진우 이보영 정수희 조아영 조해인</h1>
      <h1>ⓒ 2024. 2조 All rights reserved.</h1>
    </footer>
  );
};

export default Footer;
