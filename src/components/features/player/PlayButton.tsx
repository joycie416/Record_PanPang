"use client";

import { Track } from "@/type/track";
import Image from "next/image";
import YouTube, { YouTubeEvent } from "react-youtube";
import PlayIcon from "./PlayIcon";
import { useRef, useState } from "react";

type Props = {
  music: Track;
  id: string | undefined;
};

const PlayButton = ({ music, id }: Props) => {
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const playerRef = useRef<any>(null);
  const onReady = (e: YouTubeEvent) => {
    playerRef.current = e.target;
  };

  const togglePlayVideo = () => {
    if (playerRef.current && !isPlay) {
      playerRef.current.playVideo();
      setIsPlay(!isPlay);
    } else if (playerRef.current && isPlay) {
      playerRef.current.pauseVideo();
      setIsPlay(!isPlay);
    }
  };
  return (
    <>
      <div className="hidden">
        <YouTube videoId={id} onReady={(e: YouTubeEvent) => onReady(e)} />
      </div>
      <div className="relative cursor-pointer" onClick={() => togglePlayVideo()}>
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
          isPlay={isPlay}
        />
      </div>
    </>
  );
};

export default PlayButton;
