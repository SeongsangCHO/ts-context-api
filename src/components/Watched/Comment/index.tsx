import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
// import { IBookmarkListData, useMovieDispatch } from "../../../store/Movie";
// import { updateCommentData } from "../../../store/Movie/Actions";

interface IProps {
  movie: any;
  comment: string;
}

const Comment: React.FC<IProps> = ({ movie, comment }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [commentText, setCommentText] = useState("");
  // const dispatch = useMovieDispatch();

  const elRef = useCallback(
    (node) => {
      if (node !== null) {
        node.focus();
        node.textContent = comment;
        setCommentText(comment);
      }
    },
    [isEdit, comment]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("enter");
      setIsEdit(false);
      handleEdit();
      e.currentTarget.textContent = commentText;
    }
  };

  const handleEdit = () => {
    if (isEdit) {
      // dispatch(updateCommentData(movie, commentText));
    } else {
      // 수정버튼 클릭시
    }
    setIsEdit((prev) => !prev);
  };

  const handleInput = (e: any) => {
    setCommentText(e.target.textContent);
  };

  return (
    <div>
      {isEdit ? (
        <StyledSpan
          placeholder="한줄 평을 입력하세요."
          contentEditable={isEdit}
          onInput={handleInput}
          onKeyPress={handleKeyPress}
          ref={elRef}
        />
      ) : (
        <span>{comment}</span>
      )}
      <button onClick={handleEdit}>{isEdit ? "저장" : "수정"}</button>
    </div>
  );
};

const StyledSpan = styled.span`
  display: inline-block;
  width: 200px;

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
`;

export default Comment;
