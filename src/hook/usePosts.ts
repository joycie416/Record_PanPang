import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/utils/supabase/client-actions";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"], // 쿼리 키
    queryFn: fetchPosts // 데이터 가져오는 함수
  });
};
