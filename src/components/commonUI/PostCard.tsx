import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/post";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";

type Props = {
  post: Post;
  user: User | null;
};

const PostCard = ({ post, user }: Props) => {
  const currentUserId = user?.id;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          <div>{post.user_id}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div>{post.content}</div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div>2</div>
            </div>
            <div className="flex items-center gap-2">
              <div>2</div>
            </div>
          </div>
          {currentUserId === post.user_id ? (
            <div className="flex items-center gap-2">
              <Button size="sm">수정</Button>
              <Button size="sm" variant="secondary">
                삭제
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
