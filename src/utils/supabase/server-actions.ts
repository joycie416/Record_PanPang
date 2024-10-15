"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { createClient } from "./server";

export async function signin(formData: SignInWithPasswordCredentials) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: SignUpWithPasswordCredentials) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    console.log("Sign Up Error :");
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// 댓글 CRUD

// 댓글 추가
export async function addComment(content: string, postId: string) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("comments").insert([{ content, post_id: postId, user_id: user.id }]);

  if (error) {
    throw new Error("댓글 추가에 실패했습니다.");
  }

  revalidatePath(`/posts/${postId}`);
}

// 댓글 삭제
export async function deleteComment(commentId: string) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw Error("로그인이 필요합니다.");
  }

  const { error } = await supabase.from("comments").delete().eq("comment_id", commentId).eq("user_id", user.id);

  if (error) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }
}

// 댓글 조회
export async function fetchComment(postId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("comments").select("*").eq("post_id", postId);

  if (error) {
    throw new Error("댓글을 불러오는데 실패했습니다.");
  }

  return data;
}

// 댓글 수정
export async function updateComment(commentId: string, content: string) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인 해주세요.");
  }
  const { error } = await supabase
    .from("comments")
    .update({ content })
    .eq("comment_id", commentId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error("댓글 수정에 실패했습니다.");
  }
  revalidatePath("/");
}

// 현재 사용자 조회
export async function fetchCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error(error);
    return null;
  }

  return user;
}

// 게시글 조회
export async function fetchPosts() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");

  if (error || !data) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }

  return data;
}

// post_id로 게시글 정보 조회
export async function getPostById(postId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("post_id, user_id, created_at, music_id, youtube_url, content")
    .eq("post_id", postId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

export const getPublicUrl = (name: string, path: string) => {
  const supabase = createClient();
  const {
    data: { publicUrl }
  } = supabase.storage.from(name).getPublicUrl(path);

  return publicUrl;
};
