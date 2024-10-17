"use client";

import { SpotifyTracks, Track } from "@/types/Spotify";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import CommandForPost from "./Command";
import CardForPost from "./Card";

type Props = {
  setCard: Dispatch<SetStateAction<Track | undefined>>;
  card: Track | undefined;
  cardError: string | null;
  className?: string | null;
};
const SpotifySearch = ({ setCard, card, cardError, className }: Props) => {
  const [token, setToken] = useState("");
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);

  //처음 렌더링시에 fetchToke함수를 실행시켜주고 token을 가져와서 상태값 token에 담아줌
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientPW = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    const fetchToken = async () => {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        cache: "no-store",
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientPW}`
      });
      if (!res.ok) {
        throw new Error("Failed to fetch token");
      }
      const data = await res.json();

      const { access_token: token } = data;

      setToken(token);
    };
    fetchToken();
  }, []);

  //사용자가 입력한 검색단어들이 search로 들어감, 입력값이 0보다 길어지면 dropdown됨
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      return;
    }
    setSearch(e.target.value);
    setOpen(e.target.value.length > 0);
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    // spotify에서 track data를 가져오는 비동기 함수
    const getTrack = async () => {
      const res = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=50&offset=0`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${token}`
        }
      });
      if (!res.ok) {
        throw new Error("Failed to fetch track");
      }

      const data: SpotifyTracks = await res.json();
      const tracks: Track[] = data.tracks.items;
      setTracks(tracks);
      //track를 state로 담아서 관리 필요
    };
    getTrack();
    //사용자가 검색 단어를 입력할 때마다 getTrack을 실행시켜줌
  }, [search, token]);

  //검색 리스트 클릭시 불러온 데이터의 목록과 대조하여 해당하는 데이터만 추출해서 상태값card에 넣어주는 함수
  const shiftTrackToInfocard = (id: string) => {
    const trackInfo = tracks.find((item) => {
      return item.id === id;
    });

    if (trackInfo) {
      setCard(trackInfo);
    }

    setOpen(false);
    setSearch("");
  };

  //초로 만들어진 시간은 분초로 변경해주는 함수
  const formatDuration = (durationMs: number) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className={`flex flex-col gap-5 justify-center items-center ${className}`}>
      <CommandForPost
        search={search}
        tracks={tracks}
        open={open}
        handleInputChange={handleInputChange}
        shiftTrackToInfocard={shiftTrackToInfocard}
        cardError={cardError}
      />
      <CardForPost card={card} formatDuration={formatDuration} />
    </div>
  );
};

export default SpotifySearch;
