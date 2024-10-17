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
    <>
      {card ? (
        <Card className="flex w-full min-h-[210px]">
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 w-full">
            <div className="w-[160px] h-[160px]">
              <Image
                src={card?.album.images[1]?.url || ""}
                alt="Project image"
                width={160}
                height={260}
                objectFit="cover"
                className="rounded"
              />
            </div>
            <div className="card-text flex flex-col item-align gap-3 pt-6 md:py-2">
              <CardHeader className="pt-0">
                <CardTitle className="text-3xl font-extrabold">{card?.name}</CardTitle>
                <CardDescription className="text-lg">{card?.artists[0].name}</CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-col items-start pb-0 mt-auto">
                <CardDescription>{formatDuration(card?.duration_ms || 0)}</CardDescription>
                <CardDescription>
                  {card?.album.name} - {card?.album.type} / {card?.album.release_date}
                </CardDescription>
              </CardFooter>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex w-full min-h-[210px]">
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 w-full">
            <div className="w-[160px] h-[160px] bg-gray-300 rounded"></div>
          </div>
        </Card>
      )}
    </>
  );
};

export default CardForPost;
