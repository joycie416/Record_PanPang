"use client";

import { getYoutubeID } from "@/utils/getYoutubeID";
import { getSpotifyTrack } from "@/utils/spotify-client";
import DetailPlayButton from "./DetailPlayButton";
import { useEffect, useState } from "react";
import { Track } from "@/types/track";

type Props = {
  id: string;
  token: string;
  youtubeURL: string;
};

const DetailPlayer = ({ token, id, youtubeURL }: Props) => {
  const [music, setMusic] = useState<Track>();

  useEffect(() => {
    const getTrack = async () => {
      const music = await getSpotifyTrack(id, token);
      setMusic(music);
    };
    getTrack();
  }, [id, token]);

  const youtubeId = getYoutubeID(youtubeURL);

  if (music)
    return (
      <div className=" container justify-between">
        <DetailPlayButton id={youtubeId} music={music} />
      </div>
    );
};

export default DetailPlayer;
