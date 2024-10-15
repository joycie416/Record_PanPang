"use client";

import PlayCon from "@/components/commonUI/PlayCon";
import PauseCon from "@/components/commonUI/PauseCon";
import StopCon from "@/components/commonUI/StopCon";
import Image from "next/image";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Track } from "@/types/track";
import { onReady } from "./PlayButton";
import { useRef } from "react";

const DetailPlayButton = ({ music, id }: { music: Track; id: string | undefined }) => {
  const playerRef = useRef<YouTubePlayer | null>(null);

  const handlePlayer = (type: string) => {
    if (playerRef.current) {
      if (type === "play") {
        playerRef.current.playVideo();
        return;
      } else if (type === "pause") {
        playerRef.current.pauseVideo();
        return;
      } else if (type === "stop") {
        playerRef.current.seekTo(0, true);
        playerRef.current.playVideo();
      }
    }
  };

  return (
    <>
      <div className="hidden">
        <YouTube videoId={id} onReady={(e: YouTubeEvent) => onReady(e, playerRef)} />
      </div>
      <div className="container flex flex-row gap-x-5">
        <Image alt={music.name + "앨범커버"} src={music.album.images} width={250} height={250} className="rounded-sm" />
        <div className="flex flex-col gap-y-3">
          <p className="font-black text-6xl">{music.name}</p>
          <p>
            {music.album.name}
            <span className="ml-3">{music.album.release_date}</span>
          </p>
          <p className="font-bold text-3xl">{music.artists.name}</p>
          <div className=" w-96 h-12 relative mt-auto rounded-sm bg-black">
            <div className="flex flex-row w-48 justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button onClick={() => handlePlayer("play")}>
                <PlayCon style={{ fill: "white", width: "25px" }} />
              </button>
              <button onClick={() => handlePlayer("pause")}>
                <PauseCon style={{ fill: "white", width: "25px" }} />
              </button>
              <button onClick={() => handlePlayer("stop")}>
                <StopCon style={{ fill: "white", width: "25px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPlayButton;
