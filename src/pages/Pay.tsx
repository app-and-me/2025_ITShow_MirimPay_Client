import barcondeimg from '../assets/barcode.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { useCartStore } from '../store/cart';
import { usePaymentStore } from '../store/payment';
import { postUserPaymentQr, getUserMe } from '../utils/api';

const PayContainer = styled.div`
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
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
`;

const Video = styled.video`
  width: 100%;
  max-width: 300px;
  height: auto;
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  border: 2px solid white;
  object-fit: cover;
  background-color: #000;
  display: block;
`;

const SubTitle = styled.div`
  margin-top: 3rem;
  text-align: center;
  font-size: 2rem;
  color: white;
  -webkit-text-stroke: 0.8px white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.div`
  margin: 40px auto 0 auto;
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
`;

export default function Pay() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const cart = useCartStore();
  const { setPaymentDetails } = usePaymentStore();

  useEffect(() => {
    QrScanner.listCameras(true).then((devices) => {
      setCameras(devices);
      if (devices.length > 0) {
        setSelectedDeviceId(devices[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (!videoRef.current || !selectedDeviceId) return;

    const qrScanner = new QrScanner(
      videoRef.current,
      async (result) => {
        qrScanner.stop();
        try {
          const qrData = JSON.parse(result.data);
          const { customerKey, billingKey, accessToken } = qrData;

          if (!customerKey || !billingKey || !accessToken) {
            setScanError('Invalid QR code data.');
            console.error('Invalid QR code data:', qrData);
            return;
          }

          const totalPrice = cart.getTotalPrice();
          const items = cart.items;
          let orderName = '상품 구매';
          if (items.length > 0) {
            orderName = items.length > 1 ? `${items[0].name} 외 ${items.length - 1}건` : items[0].name;
          }

          const paymentInitResponse = await postUserPaymentQr({
            amount: totalPrice,
            orderName: orderName,
          });

          const user = await getUserMe(accessToken);

          setPaymentDetails({
            orderId: paymentInitResponse.paymentData.orderId,
            amount: totalPrice,
            orderName: orderName,
            customerKey,
            billingKey,
            accessToken,
            paymentType: 'qr',
            user: user,
          });

          navigate('/pin');
        } catch (error) {
          console.error('Error processing QR code:', error);
          setScanError('Failed to process QR code. Please try again.');
        }
      },
      {
        preferredCamera: selectedDeviceId,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 10,
        calculateScanRegion: undefined,
        constraints: {
          advanced: [{ focusMode: 'continuous' }]
        },
      }
    );

    qrScannerRef.current = qrScanner;

    qrScanner.start().catch((err) => {
      console.error('Error starting QR scanner:', err);
      setScanError('Could not start QR scanner. Please check camera permissions.');
    });

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
      qrScannerRef.current = null;
    };
  }, [selectedDeviceId, cart, navigate, setPaymentDetails]);

  const goBack = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    navigate('/payment');
  };

  return (
    <PayContainer>
      <Title>QR 코드 스캔중</Title>
      <VideoContainer>
        <Video ref={videoRef} autoPlay playsInline muted controls={false} />
      </VideoContainer>

      <Wrapper>
        <select
          value={selectedDeviceId || ''}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          style={{
            marginTop: '1rem',
            fontSize: '1rem',
            padding: '0.5rem',
            borderRadius: '8px',
          }}
        >
          {cameras.map((cam) => (
            <option key={cam.id} value={cam.id}>
              {cam.label || `Camera ${cam.id}`}
            </option>
          ))}
        </select>
      </Wrapper>

      <SubTitle>
        웹캠 카메라 부분에<br />
        QR 코드를 스캔해주세요!
      </SubTitle>

      {scanError && (
        <SubTitle style={{ color: 'red', fontSize: '1.5rem' }}>
          {scanError}
        </SubTitle>
      )}

      <Wrapper>
        <Button onClick={goBack}>취소</Button>
      </Wrapper>
    </PayContainer>
  );
}
