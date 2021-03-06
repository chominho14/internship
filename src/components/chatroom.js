import { useForm } from "react-hook-form";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { RiEmotionHappyLine, RiEmotionHappyFill } from "react-icons/ri";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { messageState, toggleEmoticonState, toggleMediaState } from "../atom";
import Media from "./media";
import Emoticon from "./emoticon";

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
  align-items: center;
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
  overflow-y: auto;
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
  height: 50px;
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

// ------ 하단 바 미디어 버튼 --------

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
  color: gray;
`;

// ------ 하단 바 입력  --------

const ContentFormInput = styled.input`
  width: 50%;
  height: 70%;
  border-radius: 0.7rem;
  border: 1px solid gray;
  padding-left: 10px;
  padding-right: 34px;
`;

// ------ 하단 바 메시지 정송 버튼 --------

const ContentFormMsgBtnDiv = styled.div`
  width: 10%;
  height: 60px;
  margin-left: 5px;
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

// ------ 하단 바 이모티콘 --------

const ContentFormEmoji = styled.div`
  position: absolute;
  width: 7%;
  height: 30px;
  border-radius: 10px;
  display: flex;
  font-size: 35px;
  right: 73px;
  margin-top: 2px;
  cursor: pointer;
  padding-right: 5px;
`;

// ========= Main 실행 함수 =========
const Chatroom = () => {
  const boxRef = useRef(null);
  const [messages, setMessages] = useRecoilState(messageState);
  const [toggleMedia, setToggleMedia] = useRecoilState(toggleMediaState);
  const [toggleEmoticon, setToggleEmoticon] =
    useRecoilState(toggleEmoticonState);
  const { register, handleSubmit, setValue, reset } = useForm();

  // ----- 하단 바 Form onValid -----

  // Send 버튼이 클릭 됐을 시
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

    setTimeout(() => {
      boxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 10);
    console.log(boxRef.current);
  };

  // 미디어토글 버튼 클릭 시 반응
  const toggleMediaBtn = () => {
    setToggleMedia((prev) => !prev);
  };

  // 이모티콘 버튼 클릭 시 반응
  const toggleEmoticonBtn = () => {
    setToggleEmoticon((prev) => !prev);
  };

  const messageDeleteClick = () => {
    // 메시지 삭제
    reset();
    setMessages((message) => []);
  };
  return (
    <ChatroomContainer>
      {/* { ---- 상단 바 ----} */}
      <ChatroomTitleBar>
        <ChatroomTitle>상담 요청</ChatroomTitle>
        <ChatroomTitleBarDeleteBtn onClick={messageDeleteClick}>
          <GrFormClose />
        </ChatroomTitleBarDeleteBtn>
      </ChatroomTitleBar>
      {/* { ---- 메시지  ----} */}
      <MessageContainer>
        <div>
          <div>상담원1</div>
          <MessageContentContainer>
            <MessageContent>안녕하세요? 고객님</MessageContent>
            <MessageContentTime>08:30 AM</MessageContentTime>
          </MessageContentContainer>
        </div>
        {/* { ---- 나의 메시지 ----} */}
        <MessageContentMyContainer ref={boxRef}>
          {messages.map((message) => (
            <MessageContentMyMessage key={message.id}>
              <MessageContentMyText>{message.text}</MessageContentMyText>
              <MessageContentMyTime>{message.time}</MessageContentMyTime>
            </MessageContentMyMessage>
          ))}
        </MessageContentMyContainer>
        {/* { ---- 미디어 토글 버튼 클릭 시 ----} */}
        {toggleMedia ? <Media /> : null}
        {toggleEmoticon ? <Emoticon /> : null}
      </MessageContainer>

      {/* { ---- 하단 바 ----} */}
      <ContentContainer>
        <ContentForm onSubmit={handleSubmit(onValid)}>
          <ContentFormPopBtn onClick={toggleMediaBtn}>
            {toggleMedia ? <MdClose /> : <AiOutlinePlus />}
          </ContentFormPopBtn>
          <ContentFormInput
            placeholder="Message"
            autoComplete="off"
            type="text"
            required
            {...register("message", { required: "메시지를 입력해주세요." })}
          />
          <ContentFormEmoji onClick={toggleEmoticonBtn}>
            {toggleEmoticon ? <RiEmotionHappyFill /> : <RiEmotionHappyLine />}
          </ContentFormEmoji>
          <ContentFormMsgBtnDiv>
            <ContentFormMsgBtnBtn>Send</ContentFormMsgBtnBtn>
          </ContentFormMsgBtnDiv>
        </ContentForm>
      </ContentContainer>
    </ChatroomContainer>
  );
};

export default React.memo(Chatroom);
