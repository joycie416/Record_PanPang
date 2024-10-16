"use client";

import { SpotifyTracks, Track } from "@/types/Spotify";
import React, { useEffect, useState } from "react";

import { Music } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const SpotifySearch = () => {
  const [token, setToken] = useState("");
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [card, setCard] = useState<Track>();

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
      console.log("data", data);
      const tracks: Track[] = data.tracks.items;
      console.log("tracks", tracks);
      setTracks(tracks);
      // console.log("Album", tracks[0].album);
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

    console.log("trackInfo", trackInfo);

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
    <div className="container mx-auto flex flex-col gap-8 justify-center items-center">
      <div className="relative w-full max-w-lg">
        <Input
          value={search}
          onChange={handleInputChange}
          placeholder="노래를 입력해주세요."
          className="h-12
        "
        />
        <Command className="rounded-lg border shadow-md">
          {open ? (
            <CommandList className="absolute top-full left-0 w-full bg-white rounded-b-lg border-t-0 max-h-[300px] overflow-y-auto shadow-lg">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {tracks.map((track) => (
                  <CommandItem key={track.id} onSelect={() => shiftTrackToInfocard(track.id)}>
                    <Music className="mr-2 h-4 w-4" />
                    {track.name} - {track.artists[0]?.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          ) : (
            <CommandList></CommandList>
          )}
        </Command>
      </div>
      <div className="w-full">
        {card ? (
          <Card className="flex w-full h-[200px]">
            <div className="p-[18px]">
              <Image
                src={card?.album.images[1]?.url || ""}
                alt="Project image"
                width={160}
                height={260}
                // layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <CardHeader>
                <CardTitle className="text-3xl font-extrabold">{card?.name}</CardTitle>
                <CardDescription className="text-lg">{card?.artists[0].name}</CardDescription>
              </CardHeader>

              <CardFooter className=" flex flex-col items-start">
                <CardDescription>{formatDuration(card?.duration_ms || 0)}</CardDescription>
                <CardDescription>
                  {card?.album.name} - {card?.album.type} / {card?.album.release_date}
                </CardDescription>
              </CardFooter>
            </div>
          </Card>
        ) : (
          <Card className="flex w-[1000px] h-[240px]"></Card>
        )}
      </div>
    </div>
  );
};

export default SpotifySearch;
