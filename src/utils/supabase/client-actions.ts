import { User } from "@supabase/supabase-js";
import { supabase } from "./client";
import { Post } from "@/types/post";
import { Comment } from "@/types/comment";

const PROFILES = "profiles";
const STORAGE = "profiles";
const DEFAULT = "default";

// 이메일 존재 여부 확인용
export async function checkEmail(email: string) {
  const { data, error } = await supabase.from("profiles").select("email").eq("email", email);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// auth 정보 업데이트
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

// profile 테이블 업데이트
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
  console.error("update profile error :", error);
};

// storage 이미지 업데이트
export const updateProfileImg = async (user: User, profileImg: File | null) => {
  const hasProfileImg = user.user_metadata.profile_img !== DEFAULT;

  if (hasProfileImg && profileImg) {
    // 프로필 이미지 O, 새 이미지 O
    const { data: updateImg, error: updateError } = await supabase.storage.from(STORAGE).update(user.id, profileImg);
  } else if (!hasProfileImg && profileImg) {
    // 프로필 이미지 X, 새 이미지 O
    const { data: uploadImg, error: uploadError } = await supabase.storage.from(STORAGE).upload(user.id, profileImg);
  }
};

// storage 이미지 삭제
export const deleteProfileImg = async (user: User) => {
  if (user.user_metadata.profile_img !== DEFAULT) {
    const { data, error } = await supabase.storage.from(STORAGE).remove([user.id]);
    console.error("delete error :", error);
    await supabase.auth.updateUser({
      data: {
        ...user?.user_metadata,
        profile_img: DEFAULT
      }
    });
  }
};

// 로그인 세션 정보 가져오기
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

// 게시글 조회
export async function fetchPosts() {
  // posts 테이블에서 데이터 가져오기
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*, profiles(nickname, profile_img)")
    .order("created_at", { ascending: false });

  if (postsError || !posts) {
    console.error(postsError);
    return []; // 에러 발생 시 빈 배열 반환
  }

  // 결과에서 각 포스트의 프로필 데이터 추가
  return posts.map((post) => ({
    ...post
  }));
}

// post_id로 게시글 정보 조회
export async function getPostById(postId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(nickname, profile_img)")
    .eq("post_id", postId)
    .single();

  if (error || !data) {
    console.error(error);
    return null;
  }

  return data;
}

// user_id로 게시글 정보 조회
export async function getPostByUserId(userId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(nickname, profile_img)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }

  return data;
}

// 게시글 추가
export async function createPost(post: Partial<Post>): Promise<void> {
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
export async function updatePost(postId: string, updatedData: Partial<Post>): Promise<void> {
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
export async function deletePost(postId: string): Promise<void> {
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

// 댓글 조회
export async function fetchComment(postId: string): Promise<Comment[]> {
  const STORAGE = "profiles";

  const { data: comments, error: commentError } = await supabase
    .from("comments")
    .select("comment_id, content, user_id, created_at, update_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: false }); // 생성 시간 기준으로 정렬

  if (commentError) {
    console.error(commentError.message);
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }

  const commentsWithProfile = await Promise.all(
    comments.map(async (comment) => {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("nickname, profile_img")
        .eq("user_id", comment.user_id)
        .single();

      if (profileError) {
        throw new Error("프로필 정보를 불러오는데 실패했습니다.");
      }

      // `profile_img`를 가져와 절대 경로 생성
      const { data: { publicUrl: profileImgUrl } = {} } = supabase.storage
        .from(STORAGE)
        .getPublicUrl(profile.profile_img ?? "default");

      return {
        ...comment,
        profile: {
          nickname: profile.nickname,
          profile_img: profileImgUrl || "/default-profile.png"
        }
      };
    })
  );

  return commentsWithProfile;
}
