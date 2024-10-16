"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteProfileImg,
  getPublicUrl,
  updateProfile,
  updateProfileImg,
  updateUser
} from "@/utils/supabase/client-actions";
import { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const STORAGE = "profiles";
const EditProfileModal = ({
  user,
  setShowModal
}: {
  user: User | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  /* 기존 프로필 이미지가 있고 별도의 파일을 추가하지 않은 경우, */
  /* 수정하기 버튼을 눌러도 기존 프로필 이미지 유지.            */
  /* 이미지 삭제 버튼으로만 프로필 이미지 삭제 가능             */

  const [nickname, setNickname] = useState<string>("");
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [imgPath, setImgPath] = useState<string>("");

  // 현재 사용자 정보
  const currentUserId = user?.id;

  // 사용자 프로필 업데이트 시 정보 바로 갱신되도록
  const queryClient = useQueryClient();
  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: () => updateUser(user as User, nickname, profileImg),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "client"]
      });
      queryClient.invalidateQueries({ queryKey: ["post", currentUserId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
  const { mutate: handleUpdateProfile } = useMutation({
    mutationFn: () => updateProfile(user as User, nickname, profileImg),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "client"]
      });
      queryClient.invalidateQueries({ queryKey: ["post", currentUserId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
  const { mutate: handleUpdateProfileImg } = useMutation({
    mutationFn: () => updateProfileImg(user as User, profileImg),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "client"]
      });
      queryClient.invalidateQueries({ queryKey: ["post", currentUserId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
  const { mutate: handleDeleteProfileImg } = useMutation({
    mutationFn: () => deleteProfileImg(user as User),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "client"]
      });
      queryClient.invalidateQueries({ queryKey: ["post", currentUserId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const userImg = getPublicUrl(STORAGE, user?.user_metadata?.profile_img ?? "default");
  const defaultImg = getPublicUrl(STORAGE, "default");

  // 불러온 이미지 미리 보기
  const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target?.files as FileList)[0];
    
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
    <div
      className="w-full min-h-screen fixed top-0 left-0 bg-gray-950/50"
      onClick={(e) => {
        e.stopPropagation();
        setNickname("");
        setProfileImg(null);
        setImgPath(userImg);
        setShowModal((prev) => !prev);
      }}
    >
      <div
        className="modal w-[30%] min-w-[300px] max-w-[400px] h-[430px] flex flex-col p-10 bg-white rounded-3xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
              previewImg(e);
            }}
            alt="프로필 이미지"
          />
          <Input
            type="text"
            placeholder="변경할 닉네임을 입력해주세요"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <div className="w-full flex justify-around items-center">
            <Button
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
            </Button>
            <Button
              className="w-[30%] min-w-[80px] py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={async (e) => {
                e.stopPropagation();
                if (!!user) {
                  await Promise.all([handleUpdateUser(), handleUpdateProfile(), handleUpdateProfileImg()]);
                  setNickname("");
                  setProfileImg(null);
                }
                alert("프로필이 수정되었습니다.");
                setShowModal((prev) => !prev);
              }}
            >
              수정하기
            </Button>
            <Button
              className="w-[30%] min-w-[80px] py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={async (e) => {
                e.stopPropagation();
                if (!!user) {
                  handleDeleteProfileImg();
                  setImgPath(defaultImg);
                  setProfileImg(null);
                }
                alert("프로필 이미지가 삭제되었습니다.");
                // setShowModal(prev => !prev)
              }}
            >
              이미지 삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
