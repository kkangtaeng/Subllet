import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InnerImage from "../components/Detail/InnerImage";
import ServiceContent from "../components/Detail/ServiceContent";
import Comment from "../components/Detail/Comment";
import { useParams } from "react-router";
import axios from "axios";

const StyledBody = styled.section`
  max-width: 950px;
  margin: 0 auto;
  transition: 0.4s;
`;

const Detail = () => {
  const ServiceId = useParams().id;
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    axios.get(`/service/${ServiceId}`).then((res) => {
      setDetail(res.data.service);
      setComments(res.data.service.Comments);
    });
  }, []);
  // console.log(comments);

  return (
    <StyledBody>
      <InnerImage open={open} detail={detail} handleClick={handleClick} />
      <ServiceContent detail={detail} />
      <Comment
        ServiceId={ServiceId}
        comments={comments}
        setComments={setComments}
      />
    </StyledBody>
  );
};

export default Detail;
