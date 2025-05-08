import styled from "styled-components";
import FaceCircleimg from '../assets/FaceRecognition.png';

const FaceContainer = styled.div`
  padding: 1.5rem;
  padding-bottom: 7rem;
  max-width: 28rem;
  margin: 0 auto;
  background-color: #008C0E;
`

const Title = styled.p`
  text-align: center;
  font-size: 25px;
  color: white;
  -webkit-text-stroke: 0.8px white;
  margin-top: 80px;
  padding-bottom: 3rem;
`

const Face_Wrapper = styled.div`
  text-align: center;
`

const FaceCircle = styled.img`
  padding-bottom: 25rem;
  width: 230px;
  max-width: 31rem;
  display: block;
  margin-top: 45px;
  align-item: center; 
  display: block;
  margin: 0 auto;
`

const SubTitle = styled.div`
  margin-top: -150px;  
  text-align: center;
  font-size: 1.2rem;
  color: white;
  -webkit-text-stroke: 0.8px white;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.div`
  display: flex;
  width: 350px;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-top:45px;
  border-radius: 10px;
  border: 2px solid #FFF;
  background: #FFF;
  color: black;
  -webkit-text-stroke: 0.4px black;

`
export default function Face() {
  return (
    <FaceContainer>
      <Title>얼굴 인식중</Title>
      <Face_Wrapper>
        <FaceCircle src={FaceCircleimg} alt="얼굴인식" />
      </Face_Wrapper>
      <SubTitle>정면을 바라보고<br></br>인식을 기다려 주세요!</SubTitle>
      <Wrapper>
        <Button>취소</Button>
      </Wrapper>
    </FaceContainer>
  )
}   
