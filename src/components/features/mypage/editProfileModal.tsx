"use client";

import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { deleteProfileImg, updateProfile, updateProfileImg, updateUser } from "@/utils/supabase/client-actions";
import { User } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const STORAGE = "profiles";
const EditProfileModal = ({
  user,
  setShowModal
}: {
  user: User | null;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  /* 기존 프로필 이미지가 있고 별도의 파일을 추가하지 않은 경우, */
  /* 수정하기 버튼을 눌러도 기존 프로필 이미지 유지.            */
  /* 이미지 삭제 버튼으로만 프로필 이미지 삭제 가능             */

  const [nickname, setNickname] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [imgPath, setImgPath] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();
  const {
    data: { publicUrl: userImg }
  } = supabase.storage.from(STORAGE).getPublicUrl(user?.user_metadata?.profile_img ?? "default");
  const {
    data: { publicUrl: defaultImg }
  } = supabase.storage.from(STORAGE).getPublicUrl("default");

  // 불러온 이미지 미리 보기
  const previewImg = () => {
    const file = imgRef.current?.files[0];
    console.log("file :", file);
    if (!file) {
      setImgPath(userImg);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPath(reader.result as string);
      };
    }
  };
  return (
    <div className="w-full min-h-screen fixed top-0 left-0 bg-gray-950/50">
      <div className="modal w-[30%] min-w-[300px] max-w-[400px] h-[430px] flex flex-col p-10 bg-white rounded-3xl">
        <div className="w-full h-full flex flex-col justify-between items-center">
          <img
            src={!imgPath ? userImg : imgPath}
            className="h-[200px] aspect-square object-cover border-2 border-gray-300 rounded-full mx-auto"
          />
          <Input
            type="file"
            className="cursor-pointer"
            accept="image/*" // image 파일만 받을 수 있도록
            onChange={(e) => {
              setProfileImg(!e.target.files ? null : e.target.files[0]);
              previewImg();
            }}
            alt="프로필 이미지"
            ref={imgRef}
          />
          <Input
            type="text"
            placeholder="변경할 닉네임을 입력해주세요"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <div className="w-full flex justify-around items-center">
            <button
              className="w-[30%] min-w-[80px] py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                setNickname("");
                setProfileImg(null);
                setImgPath(userImg);
                setShowModal((prev) => !prev);
              }}
            >
              닫기
            </button>
            <button
              className="w-[30%] min-w-[80px] py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={async (e) => {
                e.stopPropagation();
                if (!!user) {
                  // await updateUser(user, nickname, profileImg);
                  // await updateProfile(user, nickname, profileImg);
                  // await updateProfileImg(user, profileImg);

                  await Promise.all([updateUser(user, nickname, profileImg),updateProfile(user, nickname, profileImg),updateProfileImg(user, profileImg)])
                }
                alert("프로필이 수정되었습니다.");
                setShowModal((prev) => !prev);
              }}
            >
              수정하기
            </button>
            <button
              className="w-[30%] min-w-[80px] py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={async (e) => {
                e.stopPropagation();
                if (!!user) {
                  setImgPath(defaultImg);
                  await deleteProfileImg(user);
                }
                alert("프로필 이미지가 삭제되었습니다.");
                setShowModal(prev => !prev)
              }}
            >
              이미지 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
