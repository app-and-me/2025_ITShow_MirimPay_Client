// import styled from "styled-components";
import Pinimg from '../assets/PinRecognition.png';
import deal from '../assets/deal.png';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


const PinContainer = styled.div`
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
  margin-bottom: 45px;
`;

const Barcode = styled.img`
  padding-bottom: 10rem;
  margin-left: -24px;
  width: 170px;
  max-width: 31rem;
  display: block;
  justify-content: center;
  padding-bottom: 40px;
  margin: 0 auto;
`;

const User_name = styled.div`
  text-align: center;
  font-size: 25px;
  color: white;
`;

const DotContainer = styled.div`
  margin: 50px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Dot = styled.div<{ filled: boolean }>`
  width: 35px;
  height: 35px;
  border-radius: 45%;
  background-color: ${({ filled }) => (filled ? '#414141' : 'white')};
`;

const Keypad = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
`;

const KepadWrapper = styled.div`
  display: flex;
  margin-left: 38px;
  justify-content: center;
`

const Button = styled.button`
  width: 60px;
  height: 60px;
  background-color:  #008C0E;
  color: white;
  font-size: 30px;
  -webkit-text-stroke: 0.5px white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled(Button)`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyBox = styled.div`
  width: 60px;
  height: 60px;
`;

const Pin: React.FC = () => {

  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState<string[]>([]);

  const shuffleNumbers = () => {
    const nums = Array.from({ length: 10 }, (_, i) => i.toString()); // 0~9 포함
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
  };

  useEffect(() => {
    shuffleNumbers();
  }, []);

  const handleClick = (num: string) => {
    if (input.length < 4) {
      setInput((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <>
      <PinContainer>
        <Title>결제 비밀번호 입력</Title>
        <Barcode src={Pinimg} alt="핀 얼굴 인식 이미지" />
        <User_name>유*윤</User_name>

        <DotContainer>
          {[0, 1, 2, 3].map((i) => (
            <Dot key={i} filled={input.length > i} />
          ))}
        </DotContainer>
        <KepadWrapper>
          <Keypad>
            {numbers.slice(0, 9).map((num) => (
              <Button key={num} onClick={() => handleClick(num)}>
                {num}
              </Button>
            ))}
            <EmptyBox />
            <Button onClick={() => handleClick(numbers[9])}>
              {numbers[9]}
            </Button>

            {/* 지우기 버튼: 숫자 없이 이미지만 보이게 */}
            <DeleteButton onClick={handleDelete}>
              <img src={deal} alt="지우기" style={{ width: '40px', height: '40px' }} />
            </DeleteButton>
          </Keypad>
        </KepadWrapper>
      </PinContainer>
    </>
  );
};

export default Pin;

