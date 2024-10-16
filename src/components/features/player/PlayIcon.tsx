import PlayCon from "@/app/(assets)/PlayCon";
import PauseCon from "@/app/(assets)/PauseCon";
import useYoutubnStore from "@/store/playerStore";

type Props = {
  style: object;
  id: string;
};

const PlayIcon = ({ style, id }: Props) => {
  const { playedVideo } = useYoutubnStore();
  if (playedVideo.isPlay && playedVideo.id === id) {
    return <PauseCon style={style} />;
  }

  if (!playedVideo.isPlay || playedVideo.id !== id) {
    return <PlayCon style={style} />;
  }
};

export default PlayIcon;
