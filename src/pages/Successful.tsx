import Shopimg from '../assets/Shop.png';
import styled from 'styled-components';

const PaymentContainer = styled.div`
  padding: 1.5rem;
  padding-bottom: 15rem;
  margin: 0 auto;
  background-color: #008C0E;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SquareBox = styled.div`
  margin-top: 40px;
  width: 85%;
  background-color: #fff;
  border-radius: 20px;
  padding: 400px 20px 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Circle = styled.div`
  position: absolute;
  top: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #0F9444;
`;

const ShopImg = styled.img`
  margin-left: 8px;
  margin-bottom: -4px;
  width: 90px;
  height: 90px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 22px;
  color: black;
  font-weight: bold;
  margin-top: -60px;
  line-height: 1.5;

`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 20px;
  color: #0F9444;
  font-weight: bold;
  margin-top: 300px;
`;

export default function Payment() {
  return (
    <PaymentContainer>
      <SquareBox>
        <Circle>
          <ShopImg src={Shopimg} alt="shop" />
        </Circle>
        <Title>
          결제가 성공적으로<br />
          완료되었습니다!
        </Title>
        <SubTitle>MIRIM PAY</SubTitle>
      </SquareBox>
    </PaymentContainer>
  );
}
