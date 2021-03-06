import styled from "styled-components";

const MediaContainer = styled.div`
  background-color: #e0e2e1;
  position: absolute;
  width: 93%;
  bottom: 20px;
  height: 150px;
  border-radius: 10px;
  display: flex;
  font-size: 35px;
  padding: 3px;
`;

const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-top: 11px solid #e0e2e1;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  bottom: 10px;
  right: 82px;
`;

const emojis = [
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐คฃ",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐",
  "๐ฅฐ",
  "๐",
  "๐คฉ",
  "๐",
  "๐",
  "โบ",
  "๐",
  "๐",
  "๐ฅฒ",
  "๐",
  "๐",
  "๐",
  "๐คช",
  "๐",
  "๐ค",
  "๐ค",
  "๐คญ",
  "๐คซ",
  "๐ค",
  "๐ค",
  "๐คจ",
  "๐",
  "๐",
  "๐ถ",
  "๐",
  "๐",
  "๐",
  "๐ฌ",
  "๐ฎโ๐จ",
  "๐คฅ",
  "๐",
  "๐",
  "๐ช",
  "๐คค",
  "๐ด",
  "๐ท",
  "๐ค",
  "๐ค",
];

const Container = styled.div`
  height: 90%;
  width: 100%;
  overflow-y: scroll;
  padding: 5px;
`;

const Grid = styled.div`
  margin-top: 1px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 40px);
  grid-gap: 10px;
`;

const EmoticonDesign = styled.div`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const Emoticon = () => {
  return (
    <>
      <MediaContainer>
        <Container>
          <Grid>
            {emojis.map((emoji, i) => (
              <EmoticonDesign key={i}>
                <div>{emoji}</div>
              </EmoticonDesign>
            ))}
          </Grid>
        </Container>
      </MediaContainer>
      <Triangle></Triangle>
    </>
  );
};
export default Emoticon;
