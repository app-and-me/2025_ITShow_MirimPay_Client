import React from 'react'
import Webcam from 'react-webcam'
import styled, { createGlobalStyle } from 'styled-components'
import { useNavigate } from 'react-router-dom'; 



const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 7rem;
  max-width: 28rem;
  margin: 0 auto;
  background-color: #008C0E;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 25px;
  color: white;
  -webkit-text-stroke: 0.8px white;
  margin-top: 70px;
  margin-bottom: 45px;
`
const Camerabox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CameraWrapper = styled.div`
  margin-top: 5%; 
  margin-bottom: 30%;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 4px double white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Subtitle = styled.div`
  color: white;
  text-align: center;
  font-size: 1.3rem;
  margin-top: 100px;
  -webkit-text-stroke: 0.4px white;
  line-height: 1.6;
`
const Button = styled.button`
  margin: 40px auto 0 auto; 
  margin-top: 40px;
  width: 350px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid white;
  background-color: white;
  color: black;
  font-size: 1.1rem;
  cursor: pointer;
    display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export default function Face() {
  const navigate = useNavigate();
  const goBack = () => navigate('/Payment');
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>얼굴 인식 중</Title>
        <Camerabox>
          <CameraWrapper>
            <StyledWebcam
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
              }}
            />
          </CameraWrapper>
        </Camerabox>
        <Subtitle>정면을 바라보고<br />인식을 기다려 주세요!</Subtitle>
        <ButtonWrapper>
          <Button onClick={goBack}>취소</Button>
        </ButtonWrapper>
      </Container>
    </>
  )
}
