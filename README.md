# 레코드팡팡 🎭 [Record PanPang]

[메인페이지] ![스크린샷 2024-09-20 오후 4 45 08](https://github.com/user-attachments/assets/6e929713-6ba0-4e00-b423-bd1f2cec40a2)

[상세페이지] <img width="1224" alt="스크린샷 2024-09-20 오후 4 13 01" src="https://github.com/user-attachments/assets/1d4c5324-ec12-4c0b-8e99-024fde72e82a">

[커뮤니티 페이지] <img width="1105" alt="스크린샷 2024-09-22 오전 12 08 43" src="https://github.com/user-attachments/assets/a99ff3df-c371-4eb5-8d57-cff8567bd4d5">

[카테고리 페이지] <img width="1224" alt="화면캡처_2024-09-20_192523" src="src/assets/화면캡처_2024-09-20_192523.png">

---

## 팀 소개

[내일배움캠프] 2조

## 👨‍🏫 프로젝트 소개

### 음악을 공유하는 페이지

### 🚩 프로젝트 개요

- **프로젝트명** &nbsp; :&nbsp; **Record PanPang**
- **진행 기간** &nbsp;: &nbsp; **24.10.10 ~ 24.10.17**

---

### 👨‍👩‍👧‍👦 팀원 소개

|  송진우   |     이보영     |        정수희         |   조아영    |            조해인            |
| :-------: | :------------: | :-------------------: | :---------: | :--------------------------: |
| **팀원**  |    **팀원**    |       **팀원**        |  **팀원**   |           **팀장**           |
| 댓글 전반 | 음악 검색 기능 | 음악 플레이어, 좋아요 | 게시글 전반 | 회원가입/로그인, 프로필 수정 |

---

## 📚 STACKS

<div align=Left>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/typescript-1572B6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-06B6D4?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/VSCODE-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/VERCEL-007ACC?style=for-the-badge&logo=VERCEL&logoColor=white">
<img src="https://img.shields.io/badge/SLACK-green?style=for-the-badge&logo=SLACK&logoColor=white">
</div>

---

## 설치 패키지

- 프로젝트 세팅 : npx create-next-app@latest
  - tailwindcss 포함
  - 실행 : yarn dev
- tanstack query 설치 : yarn add @tanstack/react-query
  - tailwind.config.js 파일 생성 : npx tailwindcss init -p
- zustand 설치 : yarn add zustand
- zod 설치 : yarn add zod
- react-hook-form 설치 : yarn add react-hook-form @hookform/resolvers
- shadcn/ui(캐러셀 라이브러리) : yarn add shadcn/ui
  - gray, cssVariables X

---

## ✔️ Code Convention

- ES Lint , prettier 사용
- 컴포넌트일 경우에만 .jsx확장자 사용
- customHook을 사용하는 경우 : use + 함수명
- Props의 경우: on (onClick 등등)
- 함수인 경우: handle (handleClick 등등)
- 상수 : 모두 대문자 스네이크 케이스(snake_case) 예시) SNAKE_CASE
- js(변수, 함수, 인스턴스) : 카멜 케이스(camelCase) 예시) const createMovie = [];
- css, html : 케밥 케이스(kebab-case) 예시) `<div class="movie-items"></div>`
- image 명 : 케밥 케이스(kebab-case) 예시) movie-img.jpg
- 주석 최대한 활용하기 : 해당 코드 제목, 설명 간단하게 적어놓기
- 약칭은 되도록 사용하지 않기

## ✔️ Git Commit Convention

작업 타입 작업내용

- update : 해당 파일에 새로운 기능이 생김
- add : 없던 파일을 생성함, 초기 세팅
- bugfix : 버그 수정
- refactor : 코드 리팩토링
- fix : 코드 수정
- move : 파일 옮김/정리
- del : 기능/파일을 삭제
- test : 테스트 코드를 작성
- style : css
- gitfix : gitignore 수정
- script : package.json 변경(npm 설치 등)

## 🗂️ 기능 설명

[회원가입/로그인]

Supabase Auth를 사용해 관리했습니다.

1. 유효성 검사 - 1

유효성 검사를 위해 `zod`와 `react-hook-form`를 사용합니다. 존재하는 이메일은 별도의 유효성 검사를 통해 알려줍니다.

```tsx
// ./src/components/auth/Auth

const AuthForm = () => {
  ...
  const schema =
    path === SIGN_UP
      ? z.object({
          email: z
            .string()
            .email({ message: "이메일 형식으로 입력해주세요" })
            .min(1, { message: "이메일을 입력해주세요" }),
          password: z.string().min(6, "6자 이상 입력해주세요"),
          nickname: z.string().min(1, "닉네임을 입력해주세요.").max(10, "최대 10자 입력 가능합니다.")
        })
      : z.object({
          email: z.string().min(1, "이메일을 입력해주세요"),
          password: z.string().min(1, "비밀번호를 입력해주세요")
        });
  ...
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange", //'onBlur' : focus가 사라졌을 때
    defaultValues,
    resolver: zodResolver(schema)
  });
  ...
  return (
    <div className="container modal">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col items-center m-auto">
        <Input
          {...register("email")}
          placeholder="email"
          className={AUTH_CSS}
          onChange={() => setEmailMessage("")}
        />
        {formState.errors.email && <span className="text-sky-300 leading-tight">{formState.errors.email.message}</span>}
        {!!emailMessage && <span className="text-sky-300 leading-tight">{emailMessage}</span>}

        ...

      </form>
    </div>
  );
};
```

2. 유효성 검사 - 2

`profiles` 테이블에 저장된 `email`을 불러와서 해당 이메일이 존재하는 확인합니다.

```tsx
// ./src/components/auth/Auth

const AuthForm = () => {
  ...
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange", //'onBlur' : focus가 사라졌을 때
    defaultValues,
    resolver: zodResolver(schema)
  });
  ...
  const onSubmit = async (data: FieldValues) => {
    const emailData = await checkEmail(data.email);

    if (path === SIGN_UP) {
      if (emailData.length !== 0) {
        setEmailMessage("이미 존재하는 계정입니다.");
      } else {
        await signup({
          email: data.email,
          password: data.password,
          options: { data: { nickname: data.nickname, email: data.email, profile_img: "default" } }
        });
      }
    } else {
      if (emailData.length === 0) {
        setEmailMessage("존재하지 않는 계정입니다.");
      } else {
        await signin({ email: data.email, password: data.password });
      }
    }
  };
  ...
};
```

```tsx
// ./src/utils/supabase/client-actions.ts

export async function checkEmail(email: string) {
  const { data, error } = await supabase.from(PROFILES).select("email").eq("email", email);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
```

---

[플레이어]

---

[검색]

---

[게시글]

---

[댓글]

1. Supabase를 이용한 CRUD 구현

servert-action - 댓글 추가, 수정, 삭제

```jsx
// 댓글 추가
export async function addComment(content: string, postId: string) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { error } = await supabase.from("comments").insert([{ content, post_id: postId, user_id: user.id }]);

  if (error) throw new Error("댓글 추가에 실패했습니다.");

  revalidatePath(`/posts/${postId}`);
}

// 댓글 삭제
export async function deleteComment(commentId: string) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw Error("로그인이 필요합니다.");

  const { error } = await supabase.from("comments").delete().eq("comment_id", commentId).eq("user_id", user.id);

  if (error) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }
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
```

client-action - 댓글 조회

```jsx
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
```

[마이페이지]

사용자 정보와 사용자가 작성한 게시글과 댓글, 좋아요한 게시글을 확인할 수 있습니다.

1. 프로필 수정 기능

`프로필 수정하기` 버튼을 클릭하면 모달창을 통해 사용자 정보를 수정할 수 있습니다.

실시간으로 변화를 감지할 수 있도록 TanStack Query를 사용해 데이터를 불러와 변화가 발생하면 `invalidateQueries`를 통해 변경된 정보를 가져오도록 합니다.

```tsx
// ./src/components/features/mypage/EditProfileModal.tsx

const EditProfileModal = ({
  user,
  setShowModal
}: {
  user: User | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  ...
  // 사용자 프로필 업데이트 시 정보 바로 갱신되도록
  const queryClient = useQueryClient();
  // 사용자 정보 업데이트 성공 시 invalidateQueries
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
  ...
};


```

---

[네비게이션 바]

로그인 정보가 없을 시 회원가입, 로그인 버튼이 우측 상단에 위치하며, 로그인 정보가 있을 시 로그아웃, 마이페이지 버튼과 프로필 이미지가 우측 상단에 위치합니다.

1. Link 태그로 연결하여 페이지 로딩 최적화

페이지 정보를 미리 불러와서 이동 시 시간을 줄일 수 있도록 했습니다.

```tsx
// ./src/components/features/navbar/ProfileImg.tsx

const ProfileImg = () => {
  ...
  const userImg = getPublicUrl("profiles", user?.user_metadata.profile_img);

  return (
    <Link href={"/mypage"} className="min-w-fit min-h-fit rounded-full">
      <Image
        src={userImg}
        alt="프로필 이미지"
        width={40}
        height={40}
        className="w-[40px] h-[40px] border-2 rounded-full aspect-auto object-cover"
      />
    </Link>
  );
};
```

---

---

## 💥 Trouble Shooting

[회원가입/로그인]

🔥 로그아웃 해도 '로그아웃, 마이페이지' 버튼이 유지됨.

서버용/클라이언트용 supabase client를 제대로 숙지하지 못해, supabase client가 제대로 작동하지 않아 사용자 정보가 업데이트 되지 않아 발생한 문제였습니다.

서버용 supabase client를 사용할 때는 각 함수마다 client를 생성하고, 클라이언트용 supabase client는 하나의 client만 생성해 import하여 사용했습니다.

```tsx
// ./src/utils/supabase/server-action.ts

"use server";
...
import { createClient } from "./server";

export async function signin(formData: SignInWithPasswordCredentials) {
  const supabase = createClient();
  ...
}

export async function signup(formData: SignUpWithPasswordCredentials) {
  const supabase = createClient();
  ...
}

export async function signout() {
  const supabase = createClient();
  ...
}

...

```

```tsx
// ./src/utils/supabase/server.tsx

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);
}

export const supabase = createClient();
```

🔥 회원가입/로그인 시 유효성 검사에 사용할 테이블이 없었음.

`email` 컬럼 값을 unique하게 설정하기 위해 모든 사용자를 지우는 과정이 필요했습니다. 덩달아 연결된 정보도 같이 사라지게 되어 결국 모든 데이터를 지울 수 밖에 없었습니다.

좀 더 자세히 생각하고 데이터 베이스를 설계해야 한다는 것을 배웠습니다.

---

[플레이어]

---

[검색]

---

[게시글]

---

[댓글]

🔥 문제점<br>
댓글 작성 시 시간이 로컬과 다르게 표시되는 문제
댓글을 작성하면 표시되는 시간이 실제 로컬 시간과 일치하지 않는 문제가 있었습니다. Supabase가 기본적으로 UTC 시간을 사용해 데이터를 저장하기 때문에 발생한 문제였습니다.

해결<br>
댓글 작성 시간을 표시할 때 로컬 시간대로 변환하는 formatDate 함수를 사용했습니다. toLocaleString()을 사용하여 한국 표준시(KST)로 변환하여 표시했습니다.

---

[마이페이지]

🔥 다른 사용자로 로그인하면 기존 사용자 정보가 마이 페이지 사용자 정보에 적용됨.

TanStack Query를 사용해 데이터를 불러와서 auth state가 변경되면 `invalidateQueries`를 실행함. 이때 클라이언트 컴포넌트에서만 TanStack Query를 사용할 수 있고, 항상 상단에 노출되어있는 client 컴포넌트가 네비게이션 바의 프로필 이미지이므로 해당 컴포넌트에 `onAuthStateChange`를 적용함.

```tsx
// ./xrc/components/features/navbar/ProfileImg.tsx

const ProfileImg = () => {
  ...
  supabase.auth.onAuthStateChange(() => {
    // 모든 auth state 변화에 따라 session 다시 저장
    queryClient.invalidateQueries({ queryKey: ["user", "client"] });
  });
  ...
};
```

---

[네비게이션 바]

🔥 사용자 정보 변경 시 프로필 이미지가 같이 반영되지 않음

TanStack Query의 Provider 내부에 헤더를 포함시켜 `invalidateQueries`의 영향을 받도록 함.

```tsx
// ./src/app/layout.tsx

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <Background>{children}</Background>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

```tsx
// ./xrc/components/features/navbar/ProfileImg.tsx

const ProfileImg = () => {
  const defaultImg = getPublicUrl("profiles", "default");

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["user", "client"],
    queryFn: () => fetchSessionData()
  });

  supabase.auth.onAuthStateChange(() => {
    // 모든 auth state 변화에 따라 session 다시 저장
    queryClient.invalidateQueries({ queryKey: ["user", "client"] });
  });
  ...
};
```

---
