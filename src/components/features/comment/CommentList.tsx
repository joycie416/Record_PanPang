import { Comment } from "@/type/comment";

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      <ul>
        {comments.map((coment) => {
          return (
            <li key={coment.comment_id}>
              <p>{coment.created_at}</p>
              <p>{coment.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
// 사용자 닉네임, 이미지, 수정,삭제 버튼 필요
export default CommentList;
