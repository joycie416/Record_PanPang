import PlayButton from "./PlayButton";
import { getYoutubeID } from "@/utils/getYoutubeID";
import { getSpotifyTrack } from "@/utils/spotify-actions";

type playerProps = {
  id: string;
  token: string;
  youtubeURL: string;
};

const Player = async ({ id, token, youtubeURL }: playerProps) => {
  const music = await getSpotifyTrack(id, token);

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
};

export default Player;
