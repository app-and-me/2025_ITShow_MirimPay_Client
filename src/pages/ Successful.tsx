// import styled from "styled-components";////
import Shopimg from '../assets/Shop.png';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const PaymentContainer = styled.div`
  padding: 1.5rem;
  padding-bottom: 7rem;
  max-width: 28rem;
  margin: 0 auto;
  background-color: #008C0E;
`
const SquareBox = styled.div`
  margin-top: 30px;
  margin-left: 30px;
  width: 85%;
  background-color: #fff;
  border-radius: 20px;
  padding-top: 180px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`


const Circle = styled.div`
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 280px;
  background: #0F9444;
`

const ShopImg = styled.img`
  margin-left: 30px;
  margin-top: 35px;
  width: 95px;
  height: 90px;
`

const TitleContainer = styled.div`
  z-index: 9999;
`

const Title = styled.div`
  text-align: center;
  font-size: 25px;
  color: black;
  -webkit-text-stroke: 0.8px black;
  margin-top: 80px;
`

const SubTitle = styled.div`
  text-align: center;
  font-size: 25px;
  color:  #0F9444;
  -webkit-text-stroke: 0.8px  #0F9444;
  margin-top: 200px;
`




export default function Payment() {
  return (
    <>
      <GlobalStyle />
      <PaymentContainer>
        <SquareBox>
          <Circle>
            <ShopImg src={Shopimg} alt="shop" />
          </Circle>
          <TitleContainer>
            <Title>결제가 성공적으로<br></br>
              완료되었습니다!</Title>
            <SubTitle>MIRIM PAY</SubTitle>
          </TitleContainer>
        </SquareBox>
      </PaymentContainer>
    </>
  )
}