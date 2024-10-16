import { create } from "zustand";

interface SpotifyStore {
  token: string;
  setToken: (token: string) => void;
}

const useSpotifyStore = create<SpotifyStore>((set) => ({
  token: "",
  setToken: (token) => set({ token })
}));

export default useSpotifyStore;
