import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const StyledBody = styled.div`
  max-width: 100%;
  margin-bottom: 1rem;
  .fa-thumbs-up {
    color: blue;
  }
  .fa-thumbs-down {
    color: red;
  }
`;

const ServiceOption = styled.p`
  margin: 1rem 3rem;
  font-size: 2rem;
  color: #e37b02;
`;

const CommentBody = styled.div`
  background-color: #252a3b;
  color: white;
  margin: 0.5rem 0rem;
  font-size: 2rem;
  border-radius: 5px;
  padding: 1rem;
`;

const InputComment = styled.div`
  display: flex;
  textarea {
    width: 90%;
    height: 3.5rem;
    resize: none;
    font-size: 1.5rem;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;

  input {
    margin: 1rem;
  }
`;

const SendButton = styled.div`
  text-align: right;
  margin: 1rem 0rem;
  button {
    background-color: #3a3f51;
    border: 0px;
    font-size: 1.5rem;
    color: #e37b02;
    border-radius: 5px;
    padding: 0.3rem 3rem;
  }
`;

const Comments = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentList = styled.div`
  width: 90%;
  padding: 1rem;
  background-color: #3a3f51;
  border-radius: 5px;
  margin: 1rem 0;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CommentLike = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 3rem;
`;

const Comment = ({ comments, setComments, ServiceId }) => {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState();

  const day = (createdAt) => {
    let year = createdAt.slice(0, 4);
    let month = createdAt.slice(5, 7);
    let day = createdAt.slice(8, 10);
    return `${year}년 ${month}월 ${day}일`;
  };

  const inputText = (e) => {
    setComment(e.target.value);
  };

  const handleSelect = (e) => {
    setLike(e.target.value);
  };

  const sendComment = () => {
    axios
      .post(`/comment/${ServiceId}`, {
        user_id: 2,
        commenter: "test",
        message: comment,
        likes: Boolean(like),
      })
      .then((res) => {
        console.log(res.status);
        setComments([...comments, res.data.comment]);
      });
  };

  return (
    <StyledBody>
      <ServiceOption>Comment</ServiceOption>
      <CommentBody>
        <InputComment>
          <textarea onChange={inputText} placeholder="댓글을 입력해주세요" />
          <Likes>
            <input
              type="radio"
              name="likes"
              value="true"
              onChange={handleSelect}
            />
            <i className="fas fa-thumbs-up"></i>
            <input
              type="radio"
              name="likes"
              value="false"
              onChange={handleSelect}
            />
            <i className="fas fa-thumbs-down"></i>
          </Likes>
        </InputComment>
        <SendButton>
          <button onClick={sendComment}>send</button>
        </SendButton>
        {comments &&
          comments.map((comment) => {
            return (
              <Comments key={comment.id}>
                <CommentList>
                  <CommentInfo>
                    <div>테스트중</div>
                    <div>{day(comment.createdAt)}</div>
                  </CommentInfo>
                  <div>{comment.message}</div>
                </CommentList>
                <CommentLike>
                  {comment.likes ? (
                    <i className="fas fa-thumbs-up fa-2x"></i>
                  ) : (
                    <i className="fas fa-thumbs-down fa-2x"></i>
                  )}
                </CommentLike>
              </Comments>
            );
          })}
      </CommentBody>
    </StyledBody>
  );
};

export default Comment;
