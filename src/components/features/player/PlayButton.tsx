"use client";

import { Track } from "@/types/track";
import Image from "next/image";
import YouTube, { YouTubeEvent } from "react-youtube";
import PlayIcon from "./PlayIcon";
import { YouTubePlayer } from "youtube-player/dist/types";
import useYoutubnStore from "@/store/playerStore";
import { MutableRefObject, useEffect, useRef } from "react";

type Props = {
  music: Track;
  id: string | undefined;
};

export const onReady = (e: YouTubeEvent, playerRef: MutableRefObject<YouTubePlayer | null>) => {
  playerRef.current = e.target;
};

const PlayButton = ({ music, id }: Props) => {
  const { playedVideo, setIsPlay, setPlayedVideo, playedPlayer, setPlayedPlayer } = useYoutubnStore();
  // playedVideo - 현재 재생중인 비디오 정보와 재생 상태 저장하는  state / id, isPlay
  // setIsPlay - playedVideo 상태의 isPlay 상태를 변경하는 함수 / isPlay만 변경됨
  // setPlayedVideo - 노래를 처음 틀을 때 실행하는 함수 / id를 담고 state가 true로 변경됨
  // playedPlayer - 현재 재생중인 플레이어 정보를 담는 state / YouTubePlayer 가 저장됨
  // setPlayedPlayer - 현재 재생중인 플레이어 정보를 변경하는 state / 다른 노래 틀을 때 재저장용
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    const resetState = () => {
      setPlayedPlayer(null);
      setPlayedVideo("");
    };
    return resetState();
  }, [setPlayedPlayer, setPlayedVideo]);

  const togglePlayVideo = async () => {
    // 맨 처음 노래 틀었을 때
    if (playedVideo.id === "" && playerRef.current) {
      setPlayedVideo(music.id);
      playerRef.current.playVideo();
      setPlayedPlayer(playerRef.current);
    }

    // 틀었던 노래를 정지하거나 다시 재생할 때
    if (playerRef.current && playedVideo.id === music.id) {
      if (playedVideo.isPlay) {
        // 재생중이면 정지하고 재생 상태 변경
        playerRef.current.pauseVideo();
        setIsPlay();
      } else {
        // 멈춰있으면 다시 틀고 재생 상태 변경
        playerRef.current.playVideo();
        setIsPlay();
      }
    }

    // 처음 아니고 듣다가 다른 노래 틀었을 때
    if (playedVideo.id !== music.id && playerRef.current) {
      // 만약 이전 노래가 재생 중이라면...
      if (playedVideo.isPlay && playedPlayer) {
        // 재생하던 플레이어 멈추고
        playedPlayer.pauseVideo();
      }
      // 상태 갱신 해주기
      setPlayedVideo(music.id);
      setPlayedPlayer(playerRef.current);
      // 그리고 선택한 노래 재생
      playerRef.current.playVideo();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 차단
    togglePlayVideo(); // 기존 로직
  };

  return (
    <>
      <div className="hidden">
        <YouTube videoId={id} onReady={(e: YouTubeEvent) => onReady(e, playerRef)} />
      </div>
      <div className="relative w-[50px] h-[50px] cursor-pointer" onClick={(e: React.MouseEvent) => handleClick(e)}>
        <Image
          alt={music.name + "앨범커버"}
          src={music.album.images}
          width={50}
          height={50}
          className="rounded object-cover"
          style={{ width: "100%", height: "100%" }}
        />
        <div className="w-[50px] h-[50px] bg-black/30 rounded absolute top-0"></div>
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

// 플레이 누르면 => ref를 state에 저장을 하고 (전역상태로 씀)
// 다른거 플레이 누를 때 => prev 이용해서 이전 플레이어를 찾아서 얘를 정지 시키고 내가 실행하기
