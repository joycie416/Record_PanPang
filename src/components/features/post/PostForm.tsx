"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost, updatePost } from "@/utils/supabase/client-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { usePostById } from "@/hook/usePostById";
import { fetchToken } from "@/utils/spotify-client";
import SpotifySearch from "../spotifySearch/SearchForPost";
import { SpotifyTracks, Track } from "@/types/Spotify";

type Props = {
  postId?: string;
};

const PostForm = ({ postId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: post } = usePostById(postId ? postId : "");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrlError, setYoutubeUrlError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);
  const [card, setCard] = useState<Track>();

  // 수정 시 초기 데이터를 세팅하는 useEffect 추가
  useEffect(() => {
    const fetchData = async () => {
      const getTrack = async () => {
        const token = await fetchToken();
        const res = await fetch(`https://api.spotify.com/v1/search?q=${post.keyword}&type=track&limit=50&offset=0`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`
          }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch track");
        }

        const data: SpotifyTracks = await res.json();
        const tracks: Track[] = data.tracks.items;

        return tracks.filter((track) => track.id === post.music_id);
      };

      const track = await getTrack();

      if (post) {
        setYoutubeUrl(post.youtube_url);
        setContent(post.content);
        setCard(track[0]);
      }
    };
    if (post) fetchData();
  }, [post]);

  // useMutation을 사용하여 포스트 생성 및 업데이트 처리
  const mutation = useMutation({
    mutationFn: (postData: Partial<Post>) => {
      return postId ? updatePost(postId, postData) : createPost(postData);
    },
    onSuccess: () => {
      // 성공 시 입력값 초기화
      if (!postId) {
        setYoutubeUrl("");
        setContent("");
      }

      if (postId) {
        alert("게시글이 수정되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
        router.push(`/detail/${postId}`);
      } else {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        router.push("/");
      }
    },
    onError: (error) => {
      console.error(error);
      alert("게시글 처리에 실패했습니다.");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!youtubeUrl.trim()) {
      setYoutubeUrlError("유튜브 URL을 입력해 주세요.");
      isValid = false;
    } else {
      setYoutubeUrlError(null);
    }

    if (!content.trim()) {
      setContentError("내용을 입력해 주세요.");
      isValid = false;
    } else {
      setContentError(null);
    }

    if (!card) {
      setCardError("음악을 선택해주세요.");
      isValid = false;
    } else {
      setCardError(null);
    }

    if (!isValid) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["posts"] });

    const postData = {
      youtube_url: youtubeUrl,
      content,
      music_id: card?.id,
      keyword: `${card?.name}-${card?.artists[0].name}`
    };
    await mutation.mutateAsync(postData);
  };

  return (
    <>
      <SpotifySearch className="mb-8" setCard={setCard} card={card} cardError={cardError} />
      <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
        <div className="flex flex-col">
          <Input
            placeholder="선택한 노래의 유튜브 URL을 추가해주세요 *"
            value={youtubeUrl}
            className={youtubeUrlError ? "border-red-500" : ""}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          {youtubeUrlError && <p className="text-red-500 text-sm mt-1">{youtubeUrlError}</p>}
        </div>
        <div className="flex flex-col">
          <Textarea
            className={`h-32 resize-none ${contentError ? "border-red-500" : ""}`}
            placeholder="내용을 입력해주세요 *"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
        </div>
        <div className="mt-6 text-center">
          <Button size="lg">{postId ? "수정하기" : "작성하기"}</Button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
