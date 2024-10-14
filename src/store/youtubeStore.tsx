import { create } from "zustand";

interface PlayedVideo {
  playedVideo: {
    id: string;
    isPlay: boolean;
  };
  setPlayedVideo: (id: string) => void;
  setIsPlay: () => void;
}

const useYoutubnStore = create<PlayedVideo>((set) => ({
  playedVideo: { id: "", isPlay: false },
  setPlayedVideo: (id: string) => set({ playedVideo: { isPlay: true, id } }),
  setIsPlay: () => set((state) => ({ playedVideo: { ...state.playedVideo, isPlay: !state.playedVideo.isPlay } }))
}));

export default useYoutubnStore;
