import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
import AgreeCheck from "./AgreeCheck";
import AlertModal from "../AlertModal";

//! Styled Setting--------------------------------------------

const SignUpContainer = styled.div`
  @font-face {
    font-family: "InfinitySans-RegularA1";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "InfinitySans-RegularA1";
  width: 100%;
  height: 100%;
  /* margin-top: 0.5rem; */
  display: flex;
  flex-direction: column;
  /* border: 1px solid green; */
`;
const ElementBox = styled.div`
  width: 100%;
  /* height: 11rem; */
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  /* border: 1px solid purple; */
  div {
    &.validText {
      display: inline-flexbox;
      height: 1.5rem;
      align-items: center;
      color: white;
      font-size: 0.7em;
      /* border: 1px solid white; */
    }
  }
`;
const ElementTitle = styled.div`
  width: 100%;
  height: 2rem;
  color: white;
  font-size: 1.3rem;
  /* border: 1px solid white; */
`;
const EmailTab = styled.div`
  width: 100%;
  display: inline-flex;
  /* border: 1px solid blue; */
  div {
    font-size: 1rem;
    &.At {
      font-family: "Geo", sans-serif;
      margin: 0;
      width: 10%;
      font-size: 2rem;
      text-align: center;
      color: white;
    }
  }
`;

const InputBox = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0;
  border: 0.5px solid gray;
  /* margin-top: 0.2rem; */
  /* background-color: white; */
  border-radius: 0.2rem;
  font-size: 1rem;
  text-indent: 1rem;
  /* text-align: center; */
  ::-webkit-input-placeholder {
    text-align: center;
  }
  &.Email {
    width: 45%;
  }
`;

const SelectEmail = styled(Select)`
  width: 45%;
  @font-face {
    font-family: "InfinitySans-RegularA1";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "InfinitySans-RegularA1";
  .Select__control {
    border: 1px solid #a1a1a1;
    border-radius: 0.2rem;
    cursor: pointer;
  }

  .Select__control:hover {
    border-color: #a1a1a1;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
  }

  .Select__indicator-separator {
    display: none;
  }
  .Select__value {
    font-size: 1rem;
    color: blue;
  }

  .Select__menu {
    color: #3c3d3e;
  }
  .Select__dropdown-indicator {
    color: gray;
    /* background: purple; */
  }
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  color: red;
  font-size: 0.7em;
  /* border: 1px solid white; */
  &.good {
    color: #ff8a00;
  }
`;
const Button = styled.button`
  top: 1rem;
  /* position: relative; */
  width: 100%;
  height: 2.62rem;
  border: none;
  border-radius: 0.2rem;
  /* margin-left: 0.2rem; */
  background-color: #252a3c;
  font-size: 1rem;
  @font-face {
    font-family: "InfinitySans-RegularA1";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "InfinitySans-RegularA1";
  color: #ff8a00;
  :hover {
    color: #252a3c;
    box-shadow: #ff8a00 0 5rem 0rem 2rem inset;
  }
`;

//! Component render-------------------------------------------------------------

const SignUpForm = () => {
  const [frontEmail, setFrontEmail] = useState("");
  const [backEmail, setBackEmail] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(frontEmail + "@" + backEmail);
  }, [frontEmail]);

  useEffect(() => {
    setEmail(frontEmail + "@" + backEmail);
  }, [backEmail]);

  useEffect(() => {}, [email]);

  const [userInfo, setUserInfo] = useState({
    nickname: "",
    password: "",
    passwordCheck: "",
  });

  useEffect(() => {
    validPassword(userInfo.password);
    equalPassword(userInfo.password, userInfo.passwordCheck);
  }, [userInfo]);

  const userData = {
    email: email,
    nickname: userInfo.nickname,
    password: userInfo.password,
  };

  //!??????????????? ?????? State
  const [isEmail, setIsEmail] = useState(false);
  const [isDupEmail, setIsDupEmail] = useState(false); //! ????????? ????????? ???????????? State
  const [isDupNickname, setIsDupNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwdCheck, setIsPwdCheck] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  //! ???????????? ?????? state
  const [isComplete, setIsComplete] = useState(false);

  //! ?????? State
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  //! ????????? State
  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [checkMessage, setCheckMessage] = useState("");

  const checkFunc = () => {
    if (
      isEmail &&
      isDupEmail &&
      isDupNickname &&
      isPassword &&
      isPwdCheck &&
      isAgree === true
    ) {
      setIsCheck(true);
      setCheckMessage("");
    } else {
      setIsCheck(false);
    }
  };
  useEffect(() => {
    checkFunc();
  }, [isEmail, isDupEmail, isDupNickname, isPassword, isPwdCheck, isAgree]);

  //!SelectBox Options-------------------------------------------
  const options = [
    { value: "naver.com", label: "naver.com" },
    { value: "gmail.com", label: "gmail.com" },
    { value: "hanmail.net", label: "hanmail.net" },
    { value: "daum.net", label: "daum.net" },
    { value: "nate.com", label: "nate.com" },
    { value: "hotmail.com", label: "hotmail.com" },
    { value: "outlook.com", label: "outlook.com" },
    { value: "icloud.com", label: "icloud.com" },
  ];

  //! ??????????????? --------------------------------------------------

  //! password ???????????????
  const validPassword = (password) => {
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!regPassword.test(password)) {
      setIsPassword(false);
      setPasswordMessage(
        "??????+?????????+???????????? ???????????? 8?????? ?????? ????????? ?????????"
      );
    } else {
      setIsPassword(true);
      setPasswordMessage("???????????? ?????? ?????????????????????");
    }
  };
  //! password ?????? ???????????????
  const equalPassword = (password, cheeckPassword) => {
    if (password === cheeckPassword) {
      setIsPwdCheck(true);
      setPasswordCheckMessage("??????????????? ???????????????");
    } else {
      setIsPwdCheck(false);
      setPasswordCheckMessage("??????????????? ???????????? ????????????");
    }
  };
  //! Handler function-----------------------------------------------
  const navigate = useNavigate();
  const handleEmailFrontValue = (e) => {
    setFrontEmail(e.target.value);
  };

  const handleEmailBackValue = (value, key) => {
    setBackEmail(value.value);
  };
  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  //! Axios -----------------------------------------------------

  const checkEmail = () => {
    //! ????????? ????????????
    if (frontEmail.length === 0 || backEmail.length === 0) {
      setIsDupEmail(false);
      setEmailMessage("???????????? ???????????? ???????????????. ???????????? ????????? ?????????");
    } else {
      axios
        .post("/auth/email", { email: userData.email })
        .then((res) => {
          setIsEmail(true);
          setIsDupEmail(true);
          setEmailMessage("?????? ????????? ??????????????????");
        })
        .catch((err) => {
          const resMsg = err.response.data;
          if (resMsg === "Overlap") {
            setIsEmail(false);
            setIsDupEmail(false);
            setEmailMessage("?????? ??????????????? ??????????????????");
          } else if (resMsg === "Empty body") {
            setIsEmail(false);
            setIsDupEmail(false);
            setEmailMessage(
              "???????????? ???????????? ???????????????. ???????????? ????????? ?????????"
            );
          }
        });
    }
  };

  const checkNickname = () => {
    axios
      .post("/auth/nickname", { nickname: userData.nickname })
      .then((res) => {
        setIsDupNickname(true);
        setNicknameMessage("??????????????? ??????????????????");
      })
      .catch((err) => {
        const resMsg = err.response.data;
        if (resMsg === "Overlap") {
          setIsDupNickname(false);
          setNicknameMessage("?????? ?????? ?????? ??????????????????");
        } else if (resMsg === "Empty body") {
          setIsDupNickname(false);
          setNicknameMessage(
            "???????????? ???????????? ???????????????. ???????????? ????????? ?????????"
          );
        }
      });
  };

  const handleComplete = () => {
    if (isCheck !== true) {
      setCheckMessage("?????? ????????? ???????????? ????????? ?????????");
    } else {
      axios.post("/auth/signup", userData).then((res) => {
        const resMsg = res.data;
        if (resMsg === "Signup success") {
          setAlertMsg({
            message:
              "??????????????? ?????????????????????. ????????? ?????? ??? ??????????????? ????????????.",
            button: "??????",
          });
          setSuccess(true);
          setIsComplete(true);
          // setTimeout(() => {
          //   navigate("/main");
          // }, 1000);
        }
      });
    }
  };

  //! 1. Authorization Code??? ?????? ????????? ?????????????????????

  return (
    <SignUpContainer>
      {isComplete ? (
        <AlertModal
          alertMsg={alertMsg}
          success={success}
          handleClick={handleClick}
        />
      ) : null}
      <ElementBox>
        <ElementTitle>?????????</ElementTitle>
        <EmailTab>
          <InputBox
            className="Email"
            placeholder="?????????"
            onChange={(e) => {
              handleEmailFrontValue(e);
            }}
          />
          <div className="At">@</div>
          <SelectEmail
            classNamePrefix="Select"
            options={options}
            onChange={(value) => {
              handleEmailBackValue(value);
            }}
            placeholder="????????? ?????????"
          />
        </EmailTab>
        {isEmail ? (
          <ErrorMessage className="good">{emailMessage}</ErrorMessage>
        ) : email.length === 0 ? null : (
          <ErrorMessage>{emailMessage}</ErrorMessage>
        )}
        <Button onClick={() => checkEmail()}>????????? ????????????</Button>
      </ElementBox>
      <ElementBox>
        <ElementTitle>?????????</ElementTitle>
        <div className="validText">???????????? ?????? ???????????? ????????? ?????????</div>
        <InputBox
          type="text"
          placeholder="?????????"
          maxLength="8"
          onChange={handleInputValue("nickname")}
        />
        {isDupNickname ? (
          <ErrorMessage className="good">{nicknameMessage}</ErrorMessage>
        ) : userInfo.nickname.length === 0 ? (
          <ErrorMessage></ErrorMessage>
        ) : (
          <ErrorMessage>{nicknameMessage}</ErrorMessage>
        )}
        <Button onClick={() => checkNickname()}>????????? ????????????</Button>
      </ElementBox>
      <ElementBox>
        <ElementTitle>????????????</ElementTitle>
        <div className="validText">
          ??????+?????????+???????????? ???????????? 8?????? ?????? ????????? ?????????
        </div>
        <InputBox
          placeholder="????????????"
          type="password"
          onChange={handleInputValue("password")}
        />
        {isPassword ? null : userInfo.password.length === 0 ? null : (
          <ErrorMessage>{passwordMessage}</ErrorMessage>
        )}
      </ElementBox>
      <ElementBox>
        <ElementTitle>???????????? ??????</ElementTitle>
        <InputBox
          placeholder="???????????? ??????"
          type="password"
          onChange={handleInputValue("passwordCheck")}
        />
        {isPwdCheck ? null : userInfo.passwordCheck.length === 0 ? null : (
          <ErrorMessage>{passwordCheckMessage}</ErrorMessage>
        )}
        {checkMessage.length === 0 ? null : (
          <ErrorMessage>{checkMessage}</ErrorMessage>
        )}
      </ElementBox>
      <AgreeCheck isAgree={isAgree} setIsAgree={setIsAgree} />
      <Button onClick={() => handleComplete()}>????????????</Button>
    </SignUpContainer>
  );
};

export default SignUpForm;
