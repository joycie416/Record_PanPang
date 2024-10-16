"use client";

import React from "react";
import { Music } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Track } from "@/types/Spotify";

interface CommandForPostProps {
  search: string;
  tracks: Track[];
  open: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  shiftTrackToInfocard: (id: string) => void;
  cardError: string | null;
}

const CommandForPost: React.FC<CommandForPostProps> = ({
  search,
  tracks,
  open,
  handleInputChange,
  shiftTrackToInfocard,
  cardError
}) => {
  return (
    <div className="relative w-full max-w-lg">
      <Input
        value={search}
        onChange={handleInputChange}
        placeholder="노래를 입력해주세요."
        className="h-12
    "
      />
      {cardError && <p className="text-red-500 text-sm mt-1 absolute right-6 top-0 translate-y-1/2 ">{cardError}</p>}
      <Command className="rounded-lg border shadow-md">
        {open ? (
          <CommandList className="absolute top-full left-0 w-full bg-white rounded-b-lg border-t-0 max-h-[300px] overflow-y-auto shadow-lg">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {tracks.map((track) => (
                <CommandItem key={track.id} onSelect={() => shiftTrackToInfocard(track.id)}>
                  <Music className="mr-2 h-4 w-4" />
                  {track.name} - {track.artists[0]?.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        ) : (
          <CommandList></CommandList>
        )}
      </Command>
    </div>
  );
};

export default CommandForPost;
