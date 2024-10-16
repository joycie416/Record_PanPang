"use client";

import { Track } from "@/types/track";
import PlayButton from "./PlayButton";
import { getYoutubeID } from "@/utils/getYoutubeID";
import { getSpotifyTrack } from "@/utils/spotify-actions";
import { useEffect, useState } from "react";

type playerProps = {
  id: string;
  token: string;
  youtubeURL: string;
};

const Player = ({ id, token, youtubeURL }: playerProps) => {
  const [music, setMusic] = useState<Track>();
  useEffect(() => {
    const getTrack = async () => {
      const music = await getSpotifyTrack(id, token);
      setMusic(music);
    };
    getTrack();
  }, [id, token]);

  if (music) {
    return (
      <div className="w-[550px] p-4 border-[1px] rounded-md flex flex-row border-gray-300 mb-5">
        <PlayButton music={music} id={getYoutubeID(youtubeURL)} />
        <div className="ml-4">
          <p className="font-bold text-xl">{music.name}</p>
          <div className="flex flex-row gap-x-3 text-sm">
            <p>{music.artists.name}</p>
            <p className="overflow-ellipsis overflow-hidden w-[200px] whitespace-nowrap">{music.album.name}</p>
            <p>{music.album.release_date}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Player;
