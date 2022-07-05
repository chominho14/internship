import { useForm } from "react-hook-form";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { messageState, toggleMediaState } from "../atom";
import Media from "./mediaclick";

const ChatroomContainer = styled.div`
  position: fixed;
  right: 10%;
  bottom: 10%;
  max-width: 380px;
  background-color: #9fa8da;
  width: 100vh;
  height: 660px;
`;

// --- 상단 바 ---

const ChatroomTitleBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  background-color: #f5f5f6;
  height: 5%;
`;

const ChatroomTitle = styled.div`
  color: #42a5f5;
`;

const ChatroomTitleBarDeleteBtn = styled.span`
  position: absolute;
  right: 15px;
  cursor: pointer;
`;

// --- 메시지 ---

const MessageContainer = styled.div`
  height: 85%;
  overflow-y: scroll;
  padding: 10px;
`;

const MessageContentContainer = styled.div`
  display: flex;
`;

const MessageContent = styled.div`
  background-color: #c5cae8;
  padding: 10px;
  border-radius: 0.7rem;
  margin-right: 10px;
`;

const MessageContentTime = styled.div`
  margin-top: 25px;
  font-size: 0.7em;
`;

// --- 내 메시지 컨테이너 ---

const MessageContentMyContainer = styled.div``;

const MessageContentMyMessage = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding-right: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
`;

const MessageContentMyText = styled.div`
  background-color: #42a5f5;
  max-width: 220px;
  padding: 10px;
  padding-right: 10px;
  border-radius: 0.7rem;
  margin-left: 10px;
  font-size: 15px;
  color: #f5f5f6;
`;

const MessageContentMyTime = styled.div`
  display: flex;
  flex-direction: column-reverse;
  font-size: 0.7em;
  margin-bottom: 3px;
`;

// --- 하단 바 ---

const ContentContainer = styled.div`
  height: 8%;
  width: 100%;
  display: flex;
  background-color: #f5f5f6;
`;

const ContentForm = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  justify-content: center;
`;

const ContentFormPopBtn = styled.span`
  width: 33px;
  height: 33px;
  border: solid;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 33px;
  text-align: center;
  margin-top: 2px;
  cursor: pointer;
`;

const ContentFormInput = styled.input`
  width: 60%;
  height: 70%;
  border-radius: 0.7rem;
  border: 1px solid gray;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ContentFormMsgBtnDiv = styled.div`
  width: 10%;
`;

const ContentFormMsgBtnBtn = styled.button`
  height: 70%;
  border-radius: 0.9rem;
  border: 0;
  cursor: pointer;
  ${ContentFormMsgBtnDiv}:hover & {
    background-color: gray;
    transition: all 0.2s ease-in-out;
  }
`;

// ========= Main 실행 함수 =========
const Chatroom = () => {
  const boxRef = useRef(null);
  const [messages, setMessages] = useRecoilState(messageState);
  const [toggleMedia, setToggleMedia] = useRecoilState(toggleMediaState);
  const { register, handleSubmit, setValue, reset } = useForm();

  // ----- 하단 바 Form onValid -----
  const onValid = ({ message }) => {
    // 시간 설정
    const time = new Date();
    const ampm = time.getHours() > 12 ? "PM" : "AM";
    const getHour =
      time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
    const getTime = getHour + ":" + time.getMinutes() + ampm;

    // 메시지들을 Recoil을 이용하여 만든 message 배열에 넣어준다.
    setMessages((oldMessages) => [
      ...oldMessages,
      { text: message, id: Date.now(), time: getTime },
    ]);
    setValue("message", "");

    // 새로운 메시지 전송 시 스크롤 맨 아래 고정
    boxRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    console.log(boxRef.current);
  };

  const toggleMediaBtn = () => {
    // 미디어토글 버튼 클릭시 반응
    setToggleMedia((prev) => !prev);
  };

  const messageDeleteClick = () => {
    // 메시지 삭제
    reset();
    setMessages((message) => []);
  };
  return (
    <ChatroomContainer>
      <ChatroomTitleBar>
        <ChatroomTitle>상담 요청</ChatroomTitle>
        <ChatroomTitleBarDeleteBtn onClick={messageDeleteClick}>
          <GrFormClose />
        </ChatroomTitleBarDeleteBtn>
      </ChatroomTitleBar>
      <MessageContainer>
        <div>
          <div>상담원1</div>
          <MessageContentContainer>
            <MessageContent>안녕하세요? 고객님</MessageContent>
            <MessageContentTime>08.30 PM</MessageContentTime>
          </MessageContentContainer>
        </div>
        <MessageContentMyContainer ref={boxRef}>
          {messages.map((message) => (
            <MessageContentMyMessage key={message.id}>
              <MessageContentMyText>{message.text}</MessageContentMyText>
              <MessageContentMyTime>{message.time}</MessageContentMyTime>
            </MessageContentMyMessage>
          ))}
        </MessageContentMyContainer>
        {toggleMedia ? <Media /> : null}
      </MessageContainer>
      <ContentContainer>
        <ContentForm onSubmit={handleSubmit(onValid)}>
          <ContentFormPopBtn onClick={toggleMediaBtn}>
            {/* <AiOutlinePlus /> */}
            {toggleMedia ? <MdClose /> : <AiOutlinePlus />}
          </ContentFormPopBtn>

          <ContentFormInput
            placeholder="Message"
            type="text"
            required
            {...register("message", { required: "메시지를 입력해주세요." })}
          />
          <ContentFormMsgBtnDiv>
            <ContentFormMsgBtnBtn>Send</ContentFormMsgBtnBtn>
          </ContentFormMsgBtnDiv>
        </ContentForm>
      </ContentContainer>
    </ChatroomContainer>
  );
};

export default React.memo(Chatroom);
