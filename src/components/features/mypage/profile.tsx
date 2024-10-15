import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import EditProfileButton from "./EditProfileButton";

const STORAGE = "profiles";

const Profile = async () => {

  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  const {
    data: { publicUrl }
  } = supabase.storage.from(STORAGE).getPublicUrl(user?.user_metadata?.profile_img ?? "default");
  console.log("publicUrl :", publicUrl);

  return (
    <div className="w-full flex">
      <div className="mr-10">
        <Image
          src={publicUrl}
          alt={"프로필 이미지"}
          width={200}
          height={200}
          style={{
            maxWidth: 200,
            width: "full",
            aspectRatio: "1/1",
            objectFit: "cover"
          }}
          priority
          className="border-2 border-gray-300 rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <p>
            <span>{user?.user_metadata.nickname}</span> / <span>{user?.email}</span>
          </p>
          <EditProfileButton user={user} />
        </div>
        <ul></ul>
      </div>
    </div>
  );
};

export default Profile;
