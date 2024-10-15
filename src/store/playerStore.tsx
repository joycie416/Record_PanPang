import { YouTubePlayer } from "react-youtube";
import { create } from "zustand";

interface PlayedVideo {
  playedVideo: {
    id: string;
    isPlay: boolean;
  };
  playedPlayer: YouTubePlayer | null;
  token: string;
  setPlayedVideo: (id: string) => void;
  setIsPlay: () => void;
  setPlayedPlayer: (player: YouTubePlayer) => void;
}

const useYoutubnStore = create<PlayedVideo>((set) => ({
  playedVideo: { id: "", isPlay: false },
  playedPlayer: null,
  token: "",
  setPlayedVideo: (id: string) => set({ playedVideo: { isPlay: true, id } }),
  setIsPlay: () => set((state) => ({ playedVideo: { ...state.playedVideo, isPlay: !state.playedVideo.isPlay } })),
  setPlayedPlayer: (player: YouTubePlayer) => set({ playedPlayer: player })
}));

export default useYoutubnStore;
