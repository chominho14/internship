import styled from "styled-components";

import { AiOutlinePicture } from "react-icons/ai";
import { BsCameraFill } from "react-icons/bs";
import { FiMic } from "react-icons/fi";

const MediaContainer = styled.div`
  background-color: #e0e2e1;
  position: absolute;
  width: 93%;
  bottom: 23px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  font-size: 35px;
  padding: 3px;
`;

const MediaPictures = styled.div`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
`;

const MediaCamera = styled.div`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
`;

const MediaRecord = styled.div`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
`;

const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-top: 11px solid #e0e2e1;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  bottom: 12px;
  left: 25px;
`;

const Media = () => {
  return (
    <>
      <div>
        <MediaContainer>
          <MediaPictures>
            <AiOutlinePicture />
          </MediaPictures>
          <MediaCamera>
            <BsCameraFill />
          </MediaCamera>
          <MediaRecord>
            <FiMic />
          </MediaRecord>
        </MediaContainer>
        <Triangle></Triangle>
      </div>
    </>
  );
};
export default Media;
