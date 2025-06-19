import Pinimg from '../assets/PinRecognition.png';
import deal from '../assets/deal.png';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePaymentStore } from '../store/payment';
import { useCartStore } from '../store/cart';
import { postPaymentProcess, postPaymentFaceBase64, postProductsPurchase } from '../utils/api';


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
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 40px auto;
  background-color: #fff;
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
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState<string[]>([]);

  const paymentDetails = usePaymentStore((state) => state);
  const { items: cartItems, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const faceImageRef = useRef<string | null>(null);

  const shuffleNumbers = useCallback(() => {
    const nums = Array.from({ length: 10 }, (_, i) => i.toString());
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
  }, []);

  useEffect(() => {
    shuffleNumbers();
  }, [shuffleNumbers]);

  useEffect(() => {
    const storedFaceImage = localStorage.getItem('faceImage');
    if (storedFaceImage) {
        faceImageRef.current = storedFaceImage;
        localStorage.removeItem('faceImage');
    }

    if (paymentDetails.paymentType === 'face') {
        if (!paymentDetails.amount || !paymentDetails.orderName) {
            const totalAmount = getTotalPrice();
            const totalItems = getTotalItems();
            const orderName = cartItems.length > 0 
                ? `${cartItems[0].name} 등 ${totalItems}건` 
                : '상품 없음';
            paymentDetails.setPaymentDetails({
                amount: totalAmount,
                orderName: orderName,
            });
        }
    }
  }, [navigate, paymentDetails, cartItems, getTotalPrice, getTotalItems, shuffleNumbers]);

  const handleConfirm = useCallback(async () => {
    if (input.length !== 4) {
      alert('PIN은 4자리여야 합니다.');
      return;
    }

    try {
      let paymentSuccessful = false;
      if (paymentDetails.paymentType === 'qr') {
        if (!paymentDetails.orderId || !paymentDetails.amount || !paymentDetails.orderName || !paymentDetails.billingKey || !paymentDetails.customerKey || !paymentDetails.accessToken) {
          alert('QR 결제 정보가 올바르지 않습니다. 결제수단 선택화면으로 돌아갑니다.');
          paymentDetails.clearPaymentDetails();
          navigate('/payment');
          return;
        }
        await postPaymentProcess(
          {
            orderId: paymentDetails.orderId,
            amount: paymentDetails.amount,
            orderName: paymentDetails.orderName,
            billingKey: paymentDetails.billingKey,
            customerKey: paymentDetails.customerKey,
            pin: input,
          },
          paymentDetails.accessToken
        );
        paymentSuccessful = true;
      } else if (paymentDetails.paymentType === 'face') {
        if (!faceImageRef.current || !paymentDetails.amount || !paymentDetails.orderName) {
            alert('얼굴 이미지 또는 주문 정보가 없습니다. 결제수단 선택화면으로 돌아갑니다.');
            paymentDetails.clearPaymentDetails();
            navigate('/payment');
            return;
        }
        await postPaymentFaceBase64({
            amount: paymentDetails.amount,
            orderName: paymentDetails.orderName,
            faceImage: faceImageRef.current,
            pin: input,
        });
        paymentSuccessful = true;
      } else {
        alert('알 수 없는 결제 유형입니다. 결제수단 선택화면으로 돌아갑니다.');
        paymentDetails.clearPaymentDetails();
        navigate('/payment');
        return;
      }

      if (paymentSuccessful) {
        const purchaseItems = cartItems.map(item => ({ productId: item.productId, quantity: item.quantity }));
        if (purchaseItems.length > 0) {
          await postProductsPurchase({ items: purchaseItems });
        }
        
        clearCart();
        paymentDetails.clearPaymentDetails();
        setInput(''); 
        navigate('/successful');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('결제에 실패했습니다. PIN 번호를 확인하거나 다시 시도해주세요.');
      setInput(''); 
    }
  }, [input, paymentDetails, cartItems, navigate, clearCart]);

  useEffect(() => {
    if (input.length === 4) {
      handleConfirm();
    }
  }, [input, handleConfirm]);

  const handleClick = useCallback((num: string) => {
    if (input.length < 4) {
      setInput((prev) => prev + num);
    }
  }, [input.length]);

  const handleDelete = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  return (
    <>
      <PinContainer>
        <Title>결제 비밀번호 입력</Title>
        {paymentDetails.accessToken == 'face' && <Barcode 
          src={faceImageRef.current ? faceImageRef.current : Pinimg} 
          alt={paymentDetails.paymentType === 'face' ? '캡처된 얼굴 이미지' : '결제수단 기본 이미지'} 
        />}
        <User_name>
          {paymentDetails.paymentType && paymentDetails.user?.nickname 
            ? paymentDetails.user.nickname 
            : '고객님'}
        </User_name>

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
            {numbers.length > 9 && (
                <Button onClick={() => handleClick(numbers[9])}>
                    {numbers[9]}
                </Button>
            )}
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

