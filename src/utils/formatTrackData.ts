import { OriginalTrack, Track } from "@/types/track";

export const formatTrackData = (data: OriginalTrack) => {
  const newTrack: Track = {
    album: {
      id: data.album.id,
      images: data.album.images[0].url,
      name: data.album.name,
      release_date: data.album.release_date
    },
    artists: {
      id: data.artists[0].id,
      name: data.artists[0].name
    },
    id: data.id,
    name: data.name,
    duration_ms: data.duration_ms
  };
  return newTrack;
};
