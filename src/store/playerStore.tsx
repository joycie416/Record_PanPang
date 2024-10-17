import { YouTubePlayer } from "react-youtube";
import { create } from "zustand";

interface YoutubeStore {
  playedVideo: {
    post_id: string;
    id: string;
    isPlay: boolean;
  };
  playedPlayer: YouTubePlayer | null;
  token: string;
  setPlayedVideo: (id: string, post_id: string) => void;
  setIsPlay: () => void;
  setPlayedPlayer: (player: YouTubePlayer | null) => void;
}

const useYoutubnStore = create<YoutubeStore>((set) => ({
  playedVideo: { id: "", isPlay: false, post_id: "" },
  playedPlayer: null,
  token: "",
  setPlayedVideo: (id: string, post_id: string) => set({ playedVideo: { isPlay: true, id, post_id } }),
  setIsPlay: () => set((state) => ({ playedVideo: { ...state.playedVideo, isPlay: !state.playedVideo.isPlay } })),
  setPlayedPlayer: (player: YouTubePlayer | null) => set({ playedPlayer: player })
}));

export default useYoutubnStore;
