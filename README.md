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
        cpage: 1
      }
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
  isError
} = useQuery({
  queryKey: ["main-data"],
  queryFn: getData
});
```

2. 랜덤으로 8개 선택해 캐러셀로 보여주기

```jsx
// Embla.jsx
// MainPage.jsx에서 prop으로 데이터 전달 받음
const Embla = ({ data }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ stopOnMouseEnter: true, stopOnInteraction: false })]);

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
            ) => <Slide play={[carousel[i], carousel[i + 1]]} key={`slide-${i}`} />
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

---

[네비게이션 바]

---

````

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
````

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

---

[네비게이션 바]

---
