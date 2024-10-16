# 커튼콜 🎭 [outsourcing-project]

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

|   송진우   |      이보영      |        정수희        |  조아영  |         조해인         |
| :--------: | :--------------: | :------------------: | :------: | :--------------------: |
|  **팀원**  |     **팀원**     |       **팀원**       | **팀원** |        **팀장**        |
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

[예시]

- 오늘 진행 중인 공연 중 랜덤으로 8개를 선택해 캐러셀 적용 ([Embla 라이브러리](https://www.embla-carousel.com/get-started/) 사용)
- 오늘 진행 중인 공연을 캐러셀 하단에 주제별로 보여줌

1. 오늘 진행 중인 공연 정보 불러오기

```jsx
// playApi.js
// 현재 진행중인 공연 정보 등록된 순으로 최대 1000개 불러오는 함수
const BASE_URL = "http://kopis.or.kr/openApi/restful/pblprfr";
const KOPIS_KEY = import.meta.env.VITE_KOPIS_KEY;

const playApi = axios.create({ baseURL: BASE_URL });

export const getData = async () => {
  try {
    const { data } = await playApi.get("/", {
      params: {
        service: KOPIS_KEY,
        stdate: getDateString(), // 오늘 날짜 반환하는 함수
        eddate: getDateString(),
        rows: 1000,
        cpage: 1,
      },
    });
    return parseXMLToJSON(data).dbs.db;
  } catch (error) {
    console.error("Error fetching performance details:", error);
    throw new Error("데이터를 불러오는 중 오류가 발생했습니다.");
  }
};
```

```jsx
// MainPage.jsx
// 공연 정보 불러오기
const {
  data: mainData,
  isPending,
  isError,
} = useQuery({
  queryKey: ["main-data"],
  queryFn: getData,
});
```

2. 랜덤으로 8개 선택해 캐러셀로 보여주기

```jsx
// Embla.jsx
// MainPage.jsx에서 prop으로 데이터 전달 받음
const Embla = ({ data }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false }),
  ]);

  const indices = []; // 랜덤 인덱스 저장
  while (indices.length < 8) {
    let tmp = Math.floor(data.length * Math.random());
    if (indices.includes(tmp)) {
      continue;
    } else {
      indices.push(tmp);
    }
  }
  const carousel = indices.map((idx) => data[idx]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {carousel &&
          [0, 2, 4, 6].map(
            (
              i // 각 슬라이드에 두개씩 보여줌
            ) => (
              <Slide play={[carousel[i], carousel[i + 1]]} key={`slide-${i}`} />
            )
          )}
      </div>
    </div>
  );
};
```

3. 장르별로 분류된 공연 보여주기

```jsx
// Genre.jsx
// MainPage.jsx에서 prop으로 받은 데이터를 장르에 따라 filter해 GenreDiv에 보여줌
const Genre = ({data}) => {
  const [clicked, setClicked] = useState(0);
  const genreArray = Object.values(genreCodes);


  return (
      <div>
        <div>
          {
            genreArray..map((item, idx) => (
              <GenreButton idx={idx} clicked={clicked} setClicked={setClicked} key={item}>
                {item}
              </GenreButton>
            ))
          }
        </div>
        <div>
          <GenreDiv plays={data.filter(play => play.genrenm === genreArray[clicked]).slice(0,10)} idx={clicked}/>
        </div>
      </div>
  )
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

---

[마이페이지]

사용자 정보와 사용자가 작성한 게시글과 댓글, 좋아요한 게시글을 확인할 수 있습니다.

1. 프로필 수정 기능

`프로필 수정하기` 버튼을 클릭하면 모달창을 통해 사용자 정보를 수정할 수 있습니다.

실시간으로 변화를 감지할 수 있도록 TanStack Query를 사용해 데이터를 불러와 변화가 발생하면 `invalidateQueries`를 통해 변경된 정보를 가져오도록 합니다.

```tsx
// ./src/components/features/mypage/EditProfileModal.tsx

...
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

...

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

[예시]

🔥 문제점

1. 기존에는 장르별 데이터를 불러올 때 api에서 각각 불러왔으나, 데이터를 불러오는 과정이 불필요하게 많아지는 문제점이 있었음. 전체 데이터를 한 번에 많이 불러온 후 prop으로 전달해 사용함.

- 아래는 장르별 데이터를 각각 불러올 때 사용한 코드 (현재는 사용하지 않음)

```jsx
// playApi.jsx
// 장르별 데이터를 0번째부터 4번째까지 불러오는 함수
export const getGenreData = async (genre) => {
  const { data } = await playApi.get(`?genrenm=${genre}&_start=0&_end=5`);
  return data;
};

const genreArray = Object.values(genreCodes);
// Promise.all을 이용해 동시에 여러 장르 데이터 불러오는 함수
export const getClassifiedData = async () => {
  const responses = Promise.all(genreArray.map((genre) => getGenreData(genre)));
  return responses;
};
```

---

[플레이어]


---

[검색]

---

[게시글]

---

[댓글]

---

[마이페이지]

🔥 문제점

1. 다른 사용자로 로그인하면 기존 사용자 정보가 마이 페이지 사용자 정보에 적용됨.

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

🔥 문제점

1. 사용자 정보 변경 시 프로필 이미지가 같이 반영되지 않음

TanStack Query의 Provider 내부에 헤더를 포함시켜 `invalidateQueries`의 영향을 받도록 함.

```tsx
// ./src/app/layout.tsx

...

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
