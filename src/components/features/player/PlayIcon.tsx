import PlayCon from "@/app/(assets)/PlayCon";
import PauseCon from "@/app/(assets)/PauseCon";
import useYoutubnStore from "@/store/playerStore";

type Props = {
  style: object;
  id: string;
  post_id: string;
};

const PlayIcon = ({ style, id, post_id }: Props) => {
  const { playedVideo } = useYoutubnStore();
  if (playedVideo.isPlay && playedVideo.id === id && post_id === playedVideo.post_id) {
    return <PauseCon style={style} />;
  }

  if (!playedVideo.isPlay || playedVideo.id !== id || post_id !== playedVideo.post_id) {
    return <PlayCon style={style} />;
  }
};

export default PlayIcon;
