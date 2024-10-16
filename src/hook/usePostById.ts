import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/utils/supabase/client-actions";
import { Post } from "@/types/post";

export const usePostById = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId], // 각 게시글의 고유한 쿼리 키
    queryFn: () => getPostById(postId), // 게시글을 가져오는 함수
    enabled: !!postId // postId가 있을 때만 쿼리를 실행
  });
};
