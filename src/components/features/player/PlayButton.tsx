"use client";

import { Track } from "@/types/track";
import Image from "next/image";
import YouTube, { YouTubeEvent } from "react-youtube";
import PlayIcon from "./PlayIcon";
import { YouTubePlayer } from "youtube-player/dist/types";
import useYoutubnStore from "@/store/youtubeStore";
import { useRef } from "react";

type Props = {
  music: Track;
  id: string | undefined;
};

const PlayButton = ({ music, id }: Props) => {
  const { playedVideo, setIsPlay, setPlayedVideo } = useYoutubnStore();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const onReady = (e: YouTubeEvent) => {
    playerRef.current = e.target;
  };

  const togglePlayVideo = async () => {
    if (playerRef.current && playedVideo.id === music.id) {
      console.log(await playerRef.current.getPlayerState());
      if (playedVideo.isPlay) {
        playerRef.current.pauseVideo();
        setIsPlay();
      } else {
        playerRef.current.playVideo();
        setIsPlay();
      }
    }

    if (playerRef.current && playedVideo.id !== music.id) {
      console.log(await playerRef.current.getPlayerState());
      setPlayedVideo(music.id);
      playerRef.current.playVideo();
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
          id={music.id}
        />
      </div>
    </>
  );
};

export default PlayButton;
