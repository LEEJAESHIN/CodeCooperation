import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ChatLog = ({ socket, postId }) => {
  const [msgList, setMsgList] = useState([]);

  let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  let user = userInfo.nickname;
  console.log(userInfo, "유저닉네임");

  useEffect(() => {
    //스프레드문법으로 합쳐줌,
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
    });
    // socket.on("onConnect", (systemMessage) => {
    //   setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    // }); //유저 들어왔을때 표시하고 싶으면 주석해제
    // socket.on("onDisconnect", (systemMessage) => {
    //   setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    // }); //나갔을떄 표시하고싶으면 주석해제
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    console.log(postId, "포스트아이디");
    axios
      .get("http://localhost:3000/chat", { params: { postId } })
      .then((result) => {
        let Chatdata = result.data.filterd;
        console.log(Chatdata, "필터된데이터");
        let ChatMsg = [];
        let newObj = new Object();
        for (let i = 0; i < Chatdata.length; i++) {
          newObj.userName = Chatdata[i].user.nickname;
          newObj.msg = Chatdata[i].content;
          ChatMsg.push(newObj);
          newObj = new Object();
        }
        console.log(ChatMsg, "매핑된값");
        setMsgList([...ChatMsg]);
      });
  }, []);

  return (
    <Container0>
      {msgList.map((msg, idx) => (
        <Container1 key={idx}>
          {user === msg.userName ? (
            <NameText>{msg.userName}:</NameText>
          ) : (
            <NameText2>{msg.userName}:</NameText2>
          )}

          <MsgText>{msg.msg}</MsgText>
        </Container1>
      ))}
    </Container0>
  );
};

export default ChatLog;
{
  /* <div>{msg.timeStamp}</div>
          <span>{msg.msg}</span> */
}
const Container0 = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  /* border: 1px solid lightgray; */
`;

const Container1 = styled.div`
  display: flex;
  /* border: 1px solid lightgray; */
`;

const NameText = styled.div`
  font-family: Noto Sans KR;
  font-weight: 600;
  /* color: #4c5175; */
  color: #1565c0;
`;

const NameText2 = styled.div`
  font-family: Noto Sans KR;
  font-weight: 600;
  color: black;
`;

const MsgText = styled.div`
  font-family: Noto Sans KR;
  font-weight: 500;
  justify-content: center;
  margin-left: 3px;
  /* border: 1px solid lightgray; */
`;
