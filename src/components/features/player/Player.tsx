"use client";

import { Track } from "@/types/track";
import PlayButton from "./PlayButton";
import { getYoutubeID } from "@/utils/getYoutubeID";
import { getSpotifyTrack } from "@/utils/spotify-client";
import { useEffect, useState } from "react";
import { formatTrackData } from "@/utils/formatTrackData";

type playerProps = {
  id: string;
  token: string;
  youtubeURL: string;
};

const Player = ({ id, token, youtubeURL }: playerProps) => {
  const [music, setMusic] = useState<Track>();
  useEffect(() => {
    if (token) {
      const getTrack = async () => {
        const music = await getSpotifyTrack(id, token);
        setMusic(formatTrackData(music));
      };
      getTrack();
    }
  }, [id, token]);

  if (!music) {
    return (
      <div>
        {token}, {id}, {music}
      </div>
    );
  }

  return (
    <div className="flex flex-row p-4 mb-5 border border-gray-300 rounded">
      <PlayButton music={music} id={getYoutubeID(youtubeURL)} />
      <div style={{ width: "calc(100% - 50px)" }} className="grow pl-4">
        <p className="font-bold text-xl overflow-ellipsis overflow-hidden whitespace-nowrap">{music.name}</p>
        <div className="flex text-sm flex-col lg:flex-row gap-x-4 gap-y-2 lg:justify-between">
          <div className="flex flex-row gap-x-1 items-center">
            <p>{music.artists.name}</p>
            <div className="bg-gray-700 w-2 h-[1px]"></div>
            <p className="overflow-ellipsis overflow-hidden min-w-[200px] whitespace-nowrap">{music.album.name}</p>
          </div>
          <p className="text-gray-400">{music.album.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
