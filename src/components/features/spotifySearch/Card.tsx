"use client";

import React from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Track } from "@/types/Spotify";

interface CardForPostProps {
  card: Track | undefined;
  formatDuration: (durationMs: number) => string;
}

const CardForPost: React.FC<CardForPostProps> = ({ card, formatDuration }) => {
  return (
    <div className="w-full">
      {card ? (
        <Card className="flex w-full h-[200px]">
          <div className="p-[18px]">
            <Image
              src={card?.album.images[1]?.url || ""}
              alt="Project image"
              width={160}
              height={260}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-3">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold">{card?.name}</CardTitle>
              <CardDescription className="text-lg">{card?.artists[0].name}</CardDescription>
            </CardHeader>

            <CardFooter className=" flex flex-col items-start">
              <CardDescription>{formatDuration(card?.duration_ms || 0)}</CardDescription>
              <CardDescription>
                {card?.album.name} - {card?.album.type} / {card?.album.release_date}
              </CardDescription>
            </CardFooter>
          </div>
        </Card>
      ) : (
        <Card className="flex h-[200px]"></Card>
      )}
    </div>
  );
};

export default CardForPost;
