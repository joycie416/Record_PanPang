import { formatTrackData } from "@/utils/formatTrackData";
import PlayButton from "./PlayButton";
import { getYoutubeID } from "@/utils/getYoutubeID";
import { OriginalTrack } from "@/type/track";

type playerProps = {
  id: string;
  token: string;
  youtubeURL: string;
};

const Player = async ({ id, token, youtubeURL }: playerProps) => {
  // 스포티파이에 해당 음악 정보 요청
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  const data: OriginalTrack = await res.json();

  // 포맷팅 함수로 필요한 데이터만 받아옴
  const music = formatTrackData(data);

  return (
    <div className="w-[800px] p-4 border-[1px] rounded-md flex flex-row border-gray-300 m-4">
      <PlayButton music={music} id={getYoutubeID(youtubeURL)} />
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
