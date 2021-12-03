import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUserInfo, setIsLogin, setAccessToken } from "../../actions";
import styled from "styled-components";
import axios from "axios";

const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .loginFormContainer {
    background-color: #252a3c;
    padding: 0 5rem 10rem 5rem;
    margin-top: 5rem;
    border-radius: 1rem;
  }
  hr {
    width: 23rem;
    margin-top: 1rem;
    border: 1px solid #7e7e7e;
  }
  .title {
    color: #ffffff;
    font-size: 2rem;
    width: 100%;
    margin: 4rem 18rem 0 0;
  }
  .emailTitle {
    color: #ffffff;
    font-size: 1.5rem;
    margin: 3rem 19rem 1rem 0;
  }
  .passwordTitle {
    color: #ffffff;
    font-size: 1.5rem;
    margin: 3rem 17.5rem 1rem 0;
  }
  .warning {
    margin: 1rem 6rem 0 0;
    color: #cf3c3c;
    display: none;
  }
  .loginBtn {
    color: #ff8a00;
    font-size: 1rem;
    background-color: #3a3f51;
    border-color: #3f4660 #3f4660;
    border-radius: 0.5rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
    margin: 4rem 0 2rem 4rem;
    width: 16rem;
    height: 2rem;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  input {
    ::placeholder {
      text-align: center;
    }
  }
`;

const EmailContainer = styled.div`
  display: flex;
  span {
    font-size: 2rem;
    color: #ffffff;
    width: 1rem;
  }
  input {
    margin-right: 1rem;
    text-align: center;
  }
  select {
    width: 10rem;
    margin-left: 1rem;
    text-align: center;
  }
  .inputEmail {
    display: inline-flex;
    position: relative;
    /* left: 2rem; */
    height: 2rem;
  }
  .cancleBtn {
    position: relative;
    /* left: rem; */
    right: 30%;
    width: 1.5rem;
    height: 1.3rem;
    button {
      /* padding-right: 1rem; */
    }
  }
`;

const PassWordContainer = styled.div`
  input {
    width: 22rem;
    height: 2rem;
  }
`;

const emailList = [
  "naver.com",
  "gmail.com",
  "hanmail.net",
  "daum.net",
  "nate.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "직접 입력",
];

const LoginForm = () => {
  const state = useSelector((state) => state); //! state 사용 함수
  const dispatch = useDispatch(); //! action 사용 함수
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    console.log(loginInfo);
  };

  const [isSelectSelf, setIsSelectSelf] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      "loginUserInfo",
      JSON.stringify(state.loginUserInfo)
    );
  }, [state.loginUserInfo]);

  useEffect(() => {
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify(state.accessToken)
    );
  }, [state.accessToken]);

  useEffect(() => {
    window.localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
  }, [state.isLogin]);

  //! email이 이미 선택되어 있으면 id에 재선택된 email을 붙여줌
  //! email option이 "직접입력"이면 option을 text로 바꿔줌
  //! 직접 입력한 value 적용 필요!!!!!
  const handleSelect = (e) => {
    const atIndex = loginInfo.email.indexOf("@");
    const justId = loginInfo.email.slice(0, atIndex);
    console.log(justId);
    loginInfo.email.includes("@")
      ? setLoginInfo({
          ...loginInfo,
          email: justId + "@" + e.target.value,
        })
      : setLoginInfo({
          ...loginInfo,
          email: loginInfo.email + "@" + e.target.value,
        });
    console.log(loginInfo);
    e.target.value === "직접 입력"
      ? setIsSelectSelf(true)
      : setIsSelectSelf(false);
    console.log(loginInfo.email);
  };
  const [isEamilSelect, setIsEmailSelect] = useState("");
  const handleEmailSelect = (e) => {
    setIsEmailSelect(e.target.value);
  };

  const postInfo = () => {
    const { email, password } = loginInfo;
    const isAt = email.includes("@");
    if (!email || !password || !isAt) {
      alert("이메일과 비밀번호를 모두 입력해주세요"); //! alert 임시
    }
    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const { accessToken, userInfo } = res.data; //! refreshToken을 어디로 받을지 상의필요
        console.log(accessToken);
        // console.log(state);
        if (res.statusText === "OK") {
          const loginUserInfo = userInfo;
          // console.log(loginUserInfo);
          dispatch(setLoginUserInfo(loginUserInfo));
          dispatch(setAccessToken(accessToken));
          dispatch(setIsLogin(true));
          navigate("/");
        }
        console.log(state);
      })
      .catch((err) => {
        alert("올바른 아이디와 비밀번호를 입력해 주세요"); //! alert 임시
      });
  };

  const inputEnter = (e) => {
    e.key === "Enter" ? postInfo() : void 0;
  };

  return (
    <LoginStyled>
      <div className="loginFormContainer">
        <div className="title">로그인</div>
        <hr />
        <div className="emailTitle">이메일</div>
        <LoginContainer>
          <EmailContainer>
            <input
              type="text"
              placeholder="your email"
              onChange={handleInputValue("email")}
            ></input>
            <span>@</span>
            {isSelectSelf ? (
              <span>
                <input
                  className="inputEmail"
                  type="text"
                  onChange={handleEmailSelect}
                  value={isEamilSelect}
                ></input>
                <span className="cancleBtn">
                  <button type="button" onClick={() => setIsSelectSelf(false)}>
                    X
                  </button>
                </span>
              </span>
            ) : (
              <select onChange={handleSelect}>
                <option disabled selected>
                  선택해주세요
                </option>
                {emailList.map((el, idx) => {
                  return <option key={idx}>{el}</option>;
                })}
              </select>
            )}
          </EmailContainer>
        </LoginContainer>
        <div className="passwordTitle">비밀번호</div>
        <PassWordContainer>
          <input
            type="password"
            placeholder="your password"
            onChange={handleInputValue("password")}
            onKeyPress={inputEnter}
          ></input>
        </PassWordContainer>
        <div className="warning">이메일 또는 비밀번호가 올바르지 않습니다</div>
        <input
          type="button"
          className="loginBtn"
          value="로그인"
          onClick={() => postInfo()}
        ></input>
        <hr />
      </div>
    </LoginStyled>
  );
};

export default LoginForm;
