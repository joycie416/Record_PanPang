import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const PostCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          <div>닉네임</div>
        </div>
      </CardHeader>
      <CardContent>
        
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div>2</div>
          </div>
          <div className="flex items-center gap-2">
            <div>2</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
