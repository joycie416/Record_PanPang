import { getYoutubeID } from "@/utils/getYoutubeID";
import { getSpotifyTrack } from "@/utils/spotify-actions";
import DetailPlayButton from "./DetailPlayButton";

type Props = {
  id: string;
  token: string;
  youtubeURL: string;
};

const DetailPlayer = async ({ token, id, youtubeURL }: Props) => {
  const music = await getSpotifyTrack(id, token);
  const youtubeId = getYoutubeID(youtubeURL);

  return (
    <div className=" container justify-between">
      <DetailPlayButton id={youtubeId} music={music} />
    </div>
  );
};

export default DetailPlayer;
