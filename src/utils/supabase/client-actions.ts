import { User } from "@supabase/supabase-js";
import { supabase } from "./client";
import { Post } from "@/types/post";

const PROFILES = "profiles";
const STORAGE = "profiles";
const DEFAULT = "default";

export const updateUser = async (user: User, nickname: string, profileImg: File | null) => {
  let profile_img = user.user_metadata.profile_img;
  if (profileImg) {
    // 새 이미지 O
    profile_img = user.id;
  }

  if (!!nickname) {
    // 닉네임이 변경된 경우
    await supabase.auth.updateUser({
      data: {
        ...user?.user_metadata,
        nickname,
        profile_img
      }
    });
  } else if (!nickname) {
    // 닉네임이 변경되지 않은 경우
    await supabase.auth.updateUser({
      data: {
        ...user?.user_metadata,
        profile_img
      }
    });
  }
};

export const updateProfile = async (user: User, nickname: string, profileImg: File | null) => {
  let profile_img = user.user_metadata.profile_img;
  if (profileImg) {
    // 새 이미지 O
    profile_img = user.id;
  }

  let updateData: { profile_img: string; nickname?: string } = { profile_img };
  if (nickname) {
    // 닉네임을 변경하는 경우
    updateData = { nickname, profile_img };
  }
  const { error } = await supabase.from(PROFILES).update(updateData).eq("user_id", user.id);
  console.log("update profile error :", error);
};

export const updateProfileImg = async (user: User, profileImg: File | null) => {
  const hasProfileImg = user.user_metadata.profile_img !== DEFAULT;

  if (hasProfileImg && profileImg) {
    // 프로필 이미지 O, 새 이미지 O
    const { data: updateImg, error: updateError } = await supabase.storage.from(STORAGE).update(user.id, profileImg);
    console.log("change Img :", updateImg, updateError);
  } else if (!hasProfileImg && profileImg) {
    // 프로필 이미지 X, 새 이미지 O
    const { data: uploadImg, error: uploadError } = await supabase.storage.from(STORAGE).upload(user.id, profileImg);
    console.log("upload Img :", uploadImg, uploadError);
  } else {
    console.log("no new profile img or profile img not changed");
  }
};

export const deleteProfileImg = async (user: User) => {
  if (user.user_metadata.profile_img !== DEFAULT) {
    const { data, error } = await supabase.storage.from(STORAGE).remove([user.id]);
    console.log("delete Img :", data, error);
    await supabase.auth.updateUser({
      data: {
        ...user?.user_metadata,
        profile_img: DEFAULT
      }
    });
  }
};

export const fetchSessionData = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (!data.session) {
    console.error(error);
  }

  return data.session?.user;
};

export const getPublicUrl = (name: string, path: string) => {
  const {
    data: { publicUrl }
  } = supabase.storage.from(name).getPublicUrl(path);

  return publicUrl;
};

// 게시글 추가
export async function createPost(post: Partial<Post>) {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("posts").insert([{ user_id: user.id, ...post }]);

  if (error) {
    console.error(error);
    throw error;
  }
}

// 게시글 수정
export async function updatePost(postId: string, updatedData: Partial<Post>) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("posts").update(updatedData).eq("post_id", postId).eq("user_id", user.id); // 게시글 소유자가 로그인한 사용자와 일치하는지 확인

  if (error) {
    console.error(error);
    throw new Error("게시글 수정에 실패했습니다.");
  }
}

// 게시글 삭제
export async function deletePost(postId: string) {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("posts").delete().eq("post_id", postId).eq("user_id", user.id);

  if (error) {
    console.error(error);
    throw new Error("게시글 삭제에 실패했습니다.");
  }
}
