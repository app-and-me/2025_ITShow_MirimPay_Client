import React from 'react'
import Webcam from 'react-webcam'
import styled, { createGlobalStyle } from 'styled-components'
import { useNavigate } from 'react-router-dom'; 



const GlobalStyle = createGlobalStyle`
  body {
    margin-top: 0;
    overflow: hidden;
  }
`;

const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 15rem;
  margin: 0 auto;
  background-color: #008C0E;
  height: 100vh; 
`;

const Title = styled.p`
  text-align: center;
  font-size: 25px;
  color: white;
  -webkit-text-stroke: 0.8px white;
  margin-top: 80px;
`
const Camerabox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CameraWrapper = styled.div`
  margin-top: 5rem; 
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
  font-size: 1.3rem;
  margin-top: 8rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  -webkit-text-stroke: 0.8px white;
`
const Button = styled.button`
  margin: 40px auto 0 auto; 
  margin-top: 40px;
  width: 250px;
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
