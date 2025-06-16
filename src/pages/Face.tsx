import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { useCartStore } from '../store/cart';
import { usePaymentStore } from '../store/payment';
import { getFaceRecognize } from '../utils/api';

const Container = styled.div`
  padding: 1.5rem;
  padding-bottom: 15rem;
  margin: 0 auto;
  background-color: #008C0E;
  height: 100vh; 
`;

const Title = styled.p`
  text-align: center;
  font-size: 50px;
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
  margin-top: 8rem; 
  width: 260px;
  height: 260px;
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
  margin-top: 8rem;
  text-align: center;
  font-size: 2rem;
  color: white;
  -webkit-text-stroke: 0.8px white;
`
const Button = styled.button`
  margin: 60px auto 0 auto;
  width: 300px;
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
  const webcamRef = useRef<Webcam>(null);
  const { getTotalPrice, items: cartItems } = useCartStore();
  const { setPaymentDetails } = usePaymentStore();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [feedback, setFeedback] = useState('정면을 바라보고 인식을 기다려 주세요!');
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCapturingRef = useRef(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; 
      try {
        setFeedback('얼굴 인식 모델을 불러오는 중...');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
        setFeedback('정면을 바라보고 원 안에 얼굴을 맞춰주세요.');
      } catch (e) {
        console.error("Error loading FaceAPI models:", e);
        setFeedback("모델 로딩 실패. 새로고침 해주세요.");
      }
    };
    loadModels();
  }, []);

  const handleFaceDetectionAndCapture = useCallback(async () => {
    if (isCapturingRef.current || !webcamRef.current || !webcamRef.current.video || !modelsLoaded) {
      return;
    }

    const video = webcamRef.current.video as HTMLVideoElement;
    if (video.readyState < video.HAVE_ENOUGH_DATA) return;

    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

    if (detections.length > 0) {
      const detection = detections[0];
      const { x, y, width, height } = detection.box;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      const faceCenterX = x + width / 2;
      const faceCenterY = y + height / 2;
      const videoCenterX = videoWidth / 2;
      const videoCenterY = videoHeight / 2;

      const isCentered = 
        Math.abs(faceCenterX - videoCenterX) < videoWidth * 0.25 &&
        Math.abs(faceCenterY - videoCenterY) < videoHeight * 0.25;

      const isLargeEnough = width > videoWidth * 0.3 && height > videoHeight * 0.3;

      if (isCentered && isLargeEnough) {
        if (detectionIntervalRef.current) {
          clearInterval(detectionIntervalRef.current);
          detectionIntervalRef.current = null;
        }
        isCapturingRef.current = true;
        setFeedback('얼굴 인식 완료! 결제를 진행합니다...');

        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) {
          setFeedback('캡처 실패. 다시 시도해주세요.');
          isCapturingRef.current = false;
          return;
        }

        const totalAmount = getTotalPrice();
        if (cartItems.length === 0) {
          alert('장바구니에 상품이 없습니다.');
          navigate('/');
          isCapturingRef.current = false;
          return;
        }
        const orderName = cartItems.length > 0 
          ? cartItems.length > 1 ? `${cartItems[0].name} 외 ${cartItems.length - 1}건` : cartItems[0].name
          : '상품 없음';

        try {
          setPaymentDetails({
            amount: totalAmount,
            orderName,
            paymentType: 'face',
            user: null,
            confidence: null,
          });
          localStorage.setItem('faceImage', imageSrc);

          const recognitionResponse = await getFaceRecognize({ faceImage: imageSrc });

          if (recognitionResponse && recognitionResponse.success && recognitionResponse.user) {
            setPaymentDetails({
                user: recognitionResponse.user,
                confidence: recognitionResponse.confidence,
            });
            navigate('/pin');
          } else {
            console.error('Face recognition failed:', recognitionResponse?.message);
            setFeedback(recognitionResponse?.message || '얼굴 인식에 실패했습니다. 다시 시도해주세요.');
            setPaymentDetails({ paymentType: null, user: null, confidence: null });
            localStorage.removeItem('faceImage');
            isCapturingRef.current = false;
            if (!detectionIntervalRef.current && modelsLoaded) {
              detectionIntervalRef.current = setInterval(() => {
                handleFaceDetectionAndCapture();
              }, 1000);
            }
          }
        } catch (err) {
          console.error('Face recognition or payment setup failed:', err);
          setFeedback('오류 발생. 다시 시도해주세요.');
          navigate('/');
          setPaymentDetails({ paymentType: null });
          localStorage.removeItem('faceImage');
          isCapturingRef.current = false;
        }
      }
    }
  }, [modelsLoaded, getTotalPrice, cartItems, navigate, setPaymentDetails]);

  useEffect(() => {
    if (modelsLoaded && !isCapturingRef.current) {
      detectionIntervalRef.current = setInterval(() => {
        handleFaceDetectionAndCapture();
      }, 1000);
    } else {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    }
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [modelsLoaded, handleFaceDetectionAndCapture]);

  const goBack = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }
    navigate('/payment');
  }

  return (
    <>
      <Container>
        <Title>얼굴 인식 중</Title>
        <Camerabox>
          <CameraWrapper>
            <StyledWebcam
              ref={webcamRef}
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
                width: 640,
                height: 480
              }}
            />
          </CameraWrapper>
        </Camerabox>
        <Subtitle>{feedback}</Subtitle>
        <ButtonWrapper>
          <Button onClick={goBack}>취소</Button>
        </ButtonWrapper>
      </Container>
    </>
  )
}
