import { formatTrackData } from "@/utils/formatTrackData";
import Image from "next/image";

type playerProps = {
  id: string;
  token: string;
};

const Player = async ({ id, token }: playerProps) => {
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await res.json();

  const music = formatTrackData(data);

  return (
    <div className="w-[800px] p-4 border-[1px] rounded-md flex flex-row border-gray-300 m-4">
      <Image alt={music.name + "앨범커버"} src={music.album.images} width={50} height={50} className="rounded-md" />
      <div className="ml-4">
        <p className="font-bold text-xl">{music.name}</p>
        <div className="flex flex-row gap-x-3 text-sm">
          <p>{music.artists.name}</p>
          <p>{music.album.name}</p>
          <p>{music.album.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
