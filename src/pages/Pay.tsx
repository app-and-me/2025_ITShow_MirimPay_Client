// import styled from "styled-components";
import barcondeimg from '../assets/barcode.png';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const PayContainer = styled.div`
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
`

const Barcode = styled.img`
  padding-bottom: 10rem;
  margin-left: -24px;
  width: 497px;
  max-width: 31rem;
  display: block;
  margin-top: 45px;
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
export default function Pay() {
  return (
    <>
      <GlobalStyle />
      <PayContainer>
        <Title>바코드 스캔중</Title>
        <Barcode src={barcondeimg} alt="로고" />
        <SubTitle>파이보 입 부분에<br></br>바코드를 스캔해주세요!</SubTitle>
        <Wrapper>
          <Button>취소</Button>
        </Wrapper>
      </PayContainer>
    </>
  )
}   
