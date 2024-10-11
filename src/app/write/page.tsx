import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WritePage = () => {
  return (
    <div className="container mx-auto my-16">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button size="lg" type="submit">
          검색
        </Button>
      </div>
      <Input />
      <Textarea />
    </div>
  );
};

export default WritePage;
