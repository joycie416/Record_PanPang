import { useQuery } from "@tanstack/react-query";
import { getPostByUserId } from "@/utils/supabase/client-actions";

export const usePostByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["post", userId], // 각 게시글의 고유한 쿼리 키
    queryFn: () => getPostByUserId(userId), // 게시글을 가져오는 함수
    enabled: !!userId // userId가 있을 때만 쿼리를 실행
  });
};
