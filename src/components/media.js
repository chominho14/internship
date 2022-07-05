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

// ----- 사진 -----

const MediaPicturesDiv = styled.div`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: gray;
`;

const MediaPictures = styled.div`
  ${MediaPicturesDiv}:hover & {
    color: black;
  }
`;

// ----- 카메라 -----

const MediaCameraDiv = styled.div`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: gray;
`;

const MediaCamera = styled.div`
  ${MediaCameraDiv}:hover & {
    color: black;
  }
`;

// ----- 마이크-----

const MediaRecordDiv = styled.div`
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  color: gray;
`;

const MediaRecord = styled.div`
  ${MediaRecordDiv}:hover & {
    color: black;
  }
`;

const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-top: 11px solid #e0e2e1;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  bottom: 12px;
  left: 35px;
`;

const Media = () => {
  return (
    <>
      <div>
        <MediaContainer>
          {/* --- 사진 --- */}
          <MediaPicturesDiv>
            <MediaPictures>
              <AiOutlinePicture />
            </MediaPictures>
          </MediaPicturesDiv>
          {/* --- 카메라 --- */}
          <MediaCameraDiv>
            <MediaCamera>
              <BsCameraFill />
            </MediaCamera>
          </MediaCameraDiv>

          {/* --- 마이크 --- */}
          <MediaRecordDiv>
            <MediaRecord>
              <FiMic />
            </MediaRecord>
          </MediaRecordDiv>
        </MediaContainer>
        <Triangle></Triangle>
      </div>
    </>
  );
};
export default Media;
