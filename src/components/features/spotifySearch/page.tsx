"use client";

import { SpotifyTracks, Track } from "@/types/Spotify";
import React, { useEffect, useState } from "react";

import { Calendar } from "lucide-react";

import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const SpotifySearch = () => {
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
  const handleInputChange = (value: string) => {
    setSearch(value);
    setOpen(value.length > 0);
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    // spotify에서 track data를 가져오는 비동기 함수
    const getTrack = async () => {
      const res = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=10&offset=0`, {
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
      //res를 state로 담아서 관리 필요
    };
    getTrack();
    //사용자가 검색 단어를 입력할 때마다 getTrack을 실행시켜줌
  }, [search, token]);

  console.log("tracks!!!", tracks);

  return (
    <div>
      <div className="relative w-full max-w-lg">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="노래를 입력해주세요." value={search} onValueChange={handleInputChange} />
          {open ? (
            <CommandList className="absolute top-full left-0 w-full bg-white rounded-b-lg border-t-0 max-h-[300px] overflow-y-auto shadow-lg">
              <CommandEmpty>No results found.</CommandEmpty>
              {tracks.map((track) => (
                <CommandItem key={track.id}>
                  <Calendar className="mr-2 h-4 w-4" />
                  {track.name}
                </CommandItem>
              ))}
            </CommandList>
          ) : (
            <CommandList></CommandList>
          )}
        </Command>
      </div>
    </div>
  );
};

export default SpotifySearch;

// ..............{track.artists.name}

{
  /* <div>
      <input
        className="border-2 border-black"
        type="text"
        placeholder="노래를 검색해주세요"
        value={search}
        onChange={handleInputChange}
      />
      <button>버튼</button>
      </div> */
}
