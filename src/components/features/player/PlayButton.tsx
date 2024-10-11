"use client";

import { Track } from "@/type/track";
import Image from "next/image";
import YouTube from "react-youtube";
import PlayIcon from "./PlayIcon";

type Props = {
  music: Track;
  id: string | undefined;
};

const PlayButton = ({ music, id }: Props) => {
  return (
    <>
      <div className="hidden">
        <YouTube videoId={id} />
      </div>
      <div className="relative">
        <Image alt={music.name + "앨범커버"} src={music.album.images} width={50} height={50} className="rounded-md" />
        <div className="w-[50px] h-[50px] bg-black/30 rounded-md absolute top-0"></div>
        <PlayIcon
          style={{
            width: "15px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fill: "white"
          }}
        />
      </div>
    </>
  );
};

export default PlayButton;
