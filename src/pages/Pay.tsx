// import styled from "styled-components";
import barcondeimg from '../assets/barcode.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PayContainer = styled.div`
  padding: 1.5rem;
  padding-bottom: 15rem;
  margin: 0 auto;
  background-color: #008C0E;
  height: 100vh; 
`

const Title = styled.p`
  text-align: center;
  font-size: 50px;
  color: white;
  -webkit-text-stroke: 0.8px white;
  margin-top: 80px;
`
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Barcode = styled.img`
  padding-top: 5rem;
  padding-bottom: 2rem;
  max-width: 25rem;
  display: block;
`

const SubTitle = styled.div`
  margin-top: 3rem;
  text-align: center;
  font-size: 2rem;
  color: white;
  -webkit-text-stroke: 0.8px white;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.div`
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


export default function Pay() {
  const navigate = useNavigate();
  const goBack = () => navigate('/Payment');

  return (
    <>
      <PayContainer>
        <Title>바코드 스캔중</Title>
        <ImgWrapper>
          <Barcode src={barcondeimg} alt="로고" />
        </ImgWrapper>
        <SubTitle>파이보 입 부분에<br></br>바코드를 스캔해주세요!</SubTitle>
        <Wrapper>
          <Button onClick={goBack}>취소</Button>
        </Wrapper>
      </PayContainer>
    </>
  )
}   
