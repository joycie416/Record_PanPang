# 레코드팡팡 🎭 [Record PanPang]

## 🔗 배포 링크

---

## 👨‍🏫 프로젝트 소개

일상과 기분을 공유하며 노래를 추천하는 뉴스피드 사이트입니다. 사용자들이 자신의 감정과 순간을 노래와 함께 표현할 수 있는 공간을 제공합니다.

## 🚩 프로젝트 개요

- **프로젝트명** &nbsp; :&nbsp; **Record PanPang**
- **진행 기간** &nbsp;: &nbsp; **24.10.10 ~ 24.10.17**

---

## ❤ 팀 소개

[내일배움캠프] 2조

## 👨‍👩‍👧‍👦 팀원 소개

|  송진우   |     이보영     |        정수희         |   조아영    |            조해인            |
| :-------: | :------------: | :-------------------: | :---------: | :--------------------------: |
| **팀원**  |    **팀원**    |       **팀원**        |  **팀원**   |           **팀장**           |
| 댓글 전반 | 음악 검색 기능 | 음악 플레이어, 좋아요 | 게시글 전반 | 회원가입/로그인, 프로필 수정 |

---

## 📚 STACKS

![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-666666?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-666666?style=for-the-badge)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)

---

## ✔️ 설치 패키지

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

**작업 타입 작업내용**

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

---

## 📦 프로젝트 파일 구조

<details>
  <summary><b>Record PanPang 파일 구조</b></summary>

```
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(assets)
 ┃ ┃ ┃ ┣ 📜EmptyHeart.tsx
 ┃ ┃ ┃ ┣ 📜FillHeart.tsx
 ┃ ┃ ┃ ┣ 📜PauseCon.tsx
 ┃ ┃ ┃ ┣ 📜PlayCon.tsx
 ┃ ┃ ┃ ┗ 📜StopCon.tsx
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┃ ┗ 📜spotifyToken.ts
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┣ 📜Pretendard.subset.woff
 ┃ ┃ ┃ ┗ 📜Pretendard.subset.woff2
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂sign-in
 ┃ ┃ ┃ ┣ 📜error.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂sign-up
 ┃ ┃ ┃ ┣ 📜error.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂write
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜globals.css
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂commonUI
 ┃ ┃ ┃ ┣ 📜LikeButton.tsx
 ┃ ┃ ┃ ┗ 📜PostCard.tsx
 ┃ ┃ ┣ 📂features
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┣ 📜authForm.tsx
 ┃ ┃ ┃ ┃ ┗ 📜signOutButton.tsx
 ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┣ 📜CommentInput.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentItem.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentList.tsx
 ┃ ┃ ┃ ┃ ┗ 📜CommentSection.tsx
 ┃ ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┃ ┣ 📜EditProfileButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜editProfileModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyComment.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyLike.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyPageTabs.tsx
 ┃ ┃ ┃ ┃ ┣ 📜MyPost.tsx
 ┃ ┃ ┃ ┃ ┣ 📜profile.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ProfileError.tsx
 ┃ ┃ ┃ ┃ ┗ 📜ProfileLoading.tsx
 ┃ ┃ ┃ ┣ 📂navbar
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┃ ┗ 📜ProfileImg.tsx
 ┃ ┃ ┃ ┣ 📂player
 ┃ ┃ ┃ ┃ ┣ 📜DetailPlayButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜DetailPlayer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PlayButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Player.tsx
 ┃ ┃ ┃ ┃ ┗ 📜PlayIcon.tsx
 ┃ ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┃ ┣ 📜PostButtons.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PostForm.tsx
 ┃ ┃ ┃ ┃ ┣ 📜PostList.tsx
 ┃ ┃ ┃ ┃ ┗ 📜PostSection.tsx
 ┃ ┃ ┃ ┗ 📂spotifySearch
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂providers
 ┃ ┃ ┃ ┗ 📜QueryClientProvider.tsx
 ┃ ┃ ┗ 📂ui
 ┃ ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┃ ┣ 📜command.tsx
 ┃ ┃ ┃ ┣ 📜dialog.tsx
 ┃ ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┃ ┗ 📜textarea.tsx
 ┃ ┣ 📂hook
 ┃ ┃ ┣ 📜usePostById.ts
 ┃ ┃ ┣ 📜usePostByUserId.ts
 ┃ ┃ ┗ 📜usePosts.ts
 ┃ ┣ 📂lib
 ┃ ┃ ┗ 📜utils.ts
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜playerStore.tsx
 ┃ ┃ ┗ 📜spotifyStore.tsx
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜comment.ts
 ┃ ┃ ┣ 📜post.ts
 ┃ ┃ ┣ 📜Spotify.ts
 ┃ ┃ ┗ 📜track.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📂supabase
 ┃ ┃ ┃ ┣ 📜client-actions.ts
 ┃ ┃ ┃ ┣ 📜client.tsx
 ┃ ┃ ┃ ┣ 📜middleware.ts
 ┃ ┃ ┃ ┣ 📜server-actions.ts
 ┃ ┃ ┃ ┗ 📜server.tsx
 ┃ ┃ ┣ 📜formatTrackData.ts
 ┃ ┃ ┣ 📜getYoutubeID.ts
 ┃ ┃ ┣ 📜spotify-client.ts
 ┃ ┃ ┗ 📜spotify-server.ts
 ┃ ┗ 📜middleware.ts
 ┣ 📜.env.local
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc
 ┣ 📜components.json
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.mjs
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.mjs
 ┣ 📜README.md
 ┣ 📜tailwind.config.ts
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

</details>
<br/>

## 📋 Supabase ERD 설계도

---

## 🗂️ 기능 설명

### 회원가입/로그인

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
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {carousel &&
          [0, 2, 4, 6].map(
            (
              i // 각 슬라이드에 두개씩 보여줌
            ) => <Slide play={[carousel[i], carousel[i + 1]]} key={`slide-${i}`} />
          )}
      </div>
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

<br />

### 플레이어

```tsx

```

<br />

### 검색

```tsx

```

<br />

### 게시글

게시글 목록을 TanStack Query를 이용하여 실시간으로 반영되도록 구현했습니다.<br />
이 기능을 통해 사용자는 게시글이 추가, 수정, 삭제될 때 즉시 업데이트된 내용을 확인할 수 있습니다.

```tsx
// PostList.tsx
const PostList = ({ user, token }: Props) => {
  // 게시글 데이터를 가져오는 훅 호출
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>게시글을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (!posts) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.post_id}>
          {/* 각 게시글을 PostCard 컴포넌트로 렌더링 */}
          <PostCard post={post} user={user} token={token} />
        </li>
      ))}
    </ul>
  );
};

// usePosts.ts
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"], // 쿼리 키
    queryFn: fetchPosts // 데이터 가져오는 함수
  });
};

// client-actions.ts
export async function fetchPosts() {
  // posts 테이블에서 데이터 가져오기
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*, profiles(nickname, profile_img)") // 프로필 데이터 포함
    .order("created_at", { ascending: false }); // 최신 게시글 우선 정렬

  // 에러 발생 시 처리
  if (postsError || !posts) {
    console.error(postsError);
    return []; // 에러 발생 시 빈 배열 반환
  }

  // 결과에서 각 포스트의 프로필 데이터 추가
  return posts.map((post) => ({
    ...post
  }));
}
```

<br/>

### 댓글

```tsx

```

<br />

### 마이페이지

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

<br />

### 네비게이션 바

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

## 💥 Trouble Shooting

### 회원가입/로그인

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
<br />
<br />

### 플레이어

```tsx

```

<br />

### 검색

```tsx

```

<br />

### 게시글

**Supabase 외래키 연결**

- **문제 발생:** `posts` 테이블에서 `post_id`로 `user_id`를 찾아 `profiles` 테이블에서 `nickname`, `profile_img` 데이터를 가져오려 했습니다. 아래 코드와 같이 작성하고 Supabase에서 외래키 연결을 시도했지만 연결되지 않았습니다. 'insert or update on table "posts" violates foreign key constraint "posts_user_id_fkey"'오류는 `posts` 테이블의 `user_id` 필드가 `profiles` 테이블의 `user_id`와 외래키로 연결되어 있는데, 삽입하려는 `user_id` 값이 `profiles` 테이블에 존재하지 않거나 유효하지 않은 경우 이 오류가 발생합니다.
- **해결 방법:** 두 테이블 간의 연결에 문제가 있는 것으로 추측되어, 기존에 등록된 데이터를 모두 삭제한 후 외래키를 다시 연결했습니다.

```tsx
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
```

<br />

### 댓글

```tsx

```

<br />

### 마이페이지

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

<br />

### 네비게이션 바

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
