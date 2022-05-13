import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

axios.defaults.withCredentials = true;

export default function Signup() {
  let user = useSelector((state) => state.userInfo.userInfo);

  const [isUserPosts, setIsUserPosts] = useState(true);
  const getInterestPost = () => {
    setIsUserPosts(false);
  };

  const [userinfo, setuserinfo] = useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };
  const handleSignup = () => {
    if (
      !userinfo.email ||
      !userinfo.password ||
      !userinfo.username ||
      !userinfo.mobile
    ) {
      setErrorMessage("모든 항목은 필수입니다");
      console.log(errorMessage);
      return;
    } else {
      setErrorMessage("");
    }
    return axios
      .post("https://localhost:4000/signup", userinfo)
      .then((res) => history.push("/"));
  };
  return (
    <Wrap>
      <ProfileDiv>
        <ProfileTop>
          <Picture></Picture>
          <Nickname>{user.nickname}지후</Nickname>
        </ProfileTop>

        <Bar></Bar>

        <ProfileMiddle>
          <StackTitle>TechStack</StackTitle>
          <Stack>JavaScript</Stack>
          <Stack>React</Stack>
        </ProfileMiddle>

        <ProfileBottom>
          <AcountInfoBtn>회원정보 수정</AcountInfoBtn>
        </ProfileBottom>
      </ProfileDiv>

      <ProjectDiv>
        <StyledNav>
          <NavItems toggle={isUserPosts} onClick={getInterestPost}>
            모집
          </NavItems>
          <NavItems>관심</NavItems>
          <NavItems>진행</NavItems>
          <NavItems>완료</NavItems>
        </StyledNav>
        <BarDiv>
          <Bar2></Bar2>
        </BarDiv>
      </ProjectDiv>
    </Wrap>
  );
}

const Wrap = styled.div`
  justify-content: center;
  padding: 10px;
  height: auto;
  display: flex;
  width: 1400px;
  margin: auto;
`;

const ProfileDiv = styled.div`
  border-radius: 20px;
  border: 1px solid rgb(196 196 196);
  box-shadow: rgb(221 221 221) 0px 0px 10px;
  width: 280px;
  height: 600px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileTop = styled.div`
  height: 250px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Picture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-top: 20px;
  border: 0;
  border: 1px solid rgb(196 196 196);
  box-shadow: rgb(221 221 221) 0px 0px 10px;
`;

const Nickname = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const Bar = styled.div`
  width: 200px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid rgb(196 196 196);
  box-shadow: rgb(221 221 221) 0px 0px 10px;
  justify-content: center;
`;

const ProfileMiddle = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StackTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const Stack = styled.div`
  font-weight: 400;
  margin-top: 5px;
  font-size: 20px;
  text-align: center;
`;

const ProfileBottom = styled.div`
  height: 80px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const AcountInfoBtn = styled.button`
  background-color: skyblue;
  border-radius: 20px;
  width: 150px;
  height: 60px;
  font-size: 20px;
  text-align: center;
  background-color: #56d0a0;
  border: 1px solid rgb(196 196 196);
  color: white;
  cursor: pointer;
`;

const ProjectDiv = styled.div`
  justify-content: center;
  border-radius: 20px;
  width: 985px;
  height: 600px;
  border: 1px solid rgb(196 196 196);
  box-shadow: rgb(221 221 221) 0px 0px 10px;
`;

const StyledNav = styled.div`
  width: auto;
  margin-top: 20px;
  height: 55px;
  display: flex;
  justify-content: center;
`;

const NavItems = styled.div`
  text-align: center;
  margin: 10px 10px 10px 0;
  width: 100px;
  height: 40px;
  line-height: 44px;
  font-weight: 300;
  font-size: 20px;
  color: black;
  cursor: pointer;
  &:hover {
    font-weight: 500;
    transition: 0s ease;
  }
  &:visited {
    border-bottom: 5px solid black;
  }
`;

const BarDiv = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Bar2 = styled.div`
  width: 900px;
  border: 1px solid rgb(196 196 196);
  box-shadow: rgb(221 221 221) 0px 0px 10px;
`;
