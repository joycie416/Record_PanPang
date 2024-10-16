"use client";

import { Track } from "@/types/track";
import Image from "next/image";
import YouTube, { YouTubeEvent } from "react-youtube";
import PlayIcon from "./PlayIcon";
import { YouTubePlayer } from "youtube-player/dist/types";
import useYoutubnStore from "@/store/playerStore";
import { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  music: Track;
  id: string | undefined;
};

const PlayButton = ({ music, id }: Props) => {
  const { playedVideo, setIsPlay, setPlayedVideo, playedPlayer, setPlayedPlayer } = useYoutubnStore();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [showYouTube, setShowYouTube] = useState(false);

  // 언마운트 될 때 스테이트 초기화
  useEffect(() => {
    const resetState = () => {
      setPlayedPlayer(null);
      setPlayedVideo("");
    };
    return resetState;
  }, [setPlayedPlayer, setPlayedVideo]);

  const onReady = (e: YouTubeEvent, playerRef: MutableRefObject<YouTubePlayer | null>) => {
    playerRef.current = e.target;
    if (playedPlayer) {
      playedPlayer.pauseVideo();
    }
    setPlayedVideo(music.id);
    playerRef.current.playVideo();
    setPlayedPlayer(playerRef.current);
  };

  const togglePlayVideo = async () => {
    if (!showYouTube) {
      setShowYouTube(true);
    }

    // 틀었던 노래를 정지하거나 다시 재생할 때
    if (playerRef.current && playedVideo.id === music.id) {
      if (playedVideo.isPlay) {
        playerRef.current.pauseVideo();
        setIsPlay();
      } else {
        playerRef.current.playVideo();
        setIsPlay();
      }
    }

    // 처음 아니고 듣다가 다른 노래 틀었을 때
    if (playedVideo.id !== music.id && playerRef.current) {
      if (playedVideo.isPlay && playedPlayer) {
        playedPlayer.pauseVideo();
      }
      setPlayedVideo(music.id);
      setPlayedPlayer(playerRef.current);
      playerRef.current.playVideo();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlayVideo();
  };

  return (
    <>
      {showYouTube && (
        <div className="hidden">
          <YouTube videoId={id} onReady={(e: YouTubeEvent) => onReady(e, playerRef)} />
        </div>
      )}
      <div className="relative cursor-pointer" onClick={(e: React.MouseEvent) => handleClick(e)}>
        <Image
          alt={music.name + "앨범커버"}
          src={music.album.images}
          width={50}
          height={50}
          className="rounded-md"
          style={{ width: "50px", height: "50px" }}
        />
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
