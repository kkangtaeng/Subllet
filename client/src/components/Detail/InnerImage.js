import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import LoginModal from "../LoginModal";

const StyledBody = styled.section`
  margin-top: 1rem;
  max-width: 100%;
`;
const BackgroundImage = styled.div`
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  @media only screen and (min-device-width: 800px) {
    background-image: url(${(props) => props.image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    height: 35rem;
    opacity: 0.7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
const ScrapButton = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div {
    font-size: 2rem;
    color: yellow;
  }
  i {
    color: yellow;
  }
`;
const DetailMessage = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin: 0rem 1rem;
  color: white;
  button {
    padding: 1rem;
    font-size: 1.5rem;
    border-radius: 0.5rem;
    background-color: black;
    opacity: 0.7;
    color: white;
  }
`;

const InnerImage = ({
  ServiceId,
  detail,
  scrapNum,
  isScrap,
  setIsScrap,
  isSub,
  setIsSub,
}) => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (state.isLogin) {
      axios
        .all([
          axios.get(`/scrap/${ServiceId}`),
          axios.get(`/subscribe/${ServiceId}`),
        ])
        .then(
          axios.spread((isScrap, isSub) => {
            setIsScrap(isScrap.data.isScrap);
            setIsSub(isSub.data.isSubscribe);
          })
        )
        .catch((err) => console.log(err));
    }
  }, []);

  const addScrap = () => {
    axios
      .post(`/scrap/${ServiceId}`, null, {
        headers: { authorization: `Bearer ${state.accessToken}` },
      })
      .then(() => {
        setIsScrap(true);
      });
  };

  const delScrap = () => {
    axios
      .delete(`/scrap/${ServiceId}`, {
        headers: { authorization: `Bearer ${state.accessToken}` },
      })
      .then(() => {
        setIsScrap(false);
      });
  };

  const addSub = () => {
    axios
      .post(
        `/subscribe/${ServiceId}`,
        {
          paydate: new Date().toDateString().slice(8, 10),
          planname: state.selectPlan.planname,
          planprice: state.selectPlan.planprice,
        },
        {
          headers: { authorization: `Bearer ${state.accessToken}` },
        }
      )
      .then(() => {
        setIsSub(true);
      });
  };

  const delSub = () => {
    axios
      .delete(`/subscribe/${ServiceId}`, {
        headers: { authorization: `Bearer ${state.accessToken}` },
      })
      .then(() => {
        setIsSub(false);
      });
  };

  return (
    <StyledBody>
      {open ? <LoginModal handleClick={handleClick} /> : null}
      <BackgroundImage image={detail.inner_image}>
        <ScrapButton>
          {state.isLogin && isScrap ? (
            <>
              <i onClick={delScrap} className="fas fa-star fa-2x"></i>
              <div>{scrapNum}</div>
            </>
          ) : state.isLogin && !isScrap ? (
            <>
              <i onClick={addScrap} className="far fa-star fa-2x"></i>
              <div>{scrapNum}</div>
            </>
          ) : (
            <>
              <i onClick={handleClick} className="far fa-star fa-2x"></i>
              <div>{scrapNum}</div>
            </>
          )}
        </ScrapButton>
        <DetailMessage>
          <span>{detail.message}</span>
          {state.isLogin && isSub ? (
            <button onClick={delSub}>구독중</button>
          ) : state.isLogin && !isSub ? (
            <button onClick={addSub}>내 구독 목록에 추가</button>
          ) : (
            <button onClick={handleClick}>내 구독 목록에 추가</button>
          )}
        </DetailMessage>
      </BackgroundImage>
    </StyledBody>
  );
};

export default InnerImage;
