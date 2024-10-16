"use client";

import PlayCon from "@/app/(assets)/PlayCon";
import PauseCon from "@/app/(assets)/PauseCon";
import StopCon from "@/app/(assets)/StopCon";
import Image from "next/image";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { Track } from "@/types/track";
import { onReady } from "./PlayButton";
import { useRef, useState } from "react";

const DetailPlayButton = ({ music, id }: { music: Track; id: string | undefined }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
      playerRef.current.seekTo(0, true);
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="hidden">
        <YouTube videoId={id} onReady={(e: YouTubeEvent) => onReady(e, playerRef)} />
      </div>
      <div className="container flex flex-row gap-x-5">
        <div className="bg-gray-300 w-[250px] h-[250px]">
          <Image
            alt={music.name + "앨범커버"}
            src={music.album.images}
            width={250}
            height={250}
            className="rounded-sm"
            priority
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="font-black text-5xl">{music.name}</p>
          <p>
            {music.album.name}
            <span className="ml-3">{music.album.release_date}</span>
          </p>
          <p className="font-bold text-2xl">{music.artists.name}</p>
          <div className=" w-96 h-12 relative mt-auto rounded-sm bg-black">
            <div className="flex flex-row w-48 justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button onClick={handlePlay} disabled={isPlaying}>
                <PlayCon style={{ fill: "white", width: "25px" }} />
              </button>
              <button onClick={handlePause} disabled={!isPlaying}>
                <PauseCon style={{ fill: "white", width: "25px" }} />
              </button>
              <button onClick={handleStop}>
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
