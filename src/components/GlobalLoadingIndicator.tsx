import styled, { keyframes } from 'styled-components';
import { useUiStore } from '../store/ui';

const SpinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;


const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #008C0E;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${SpinnerAnimation} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function GlobalLoadingIndicator() {
  const isLoading = useUiStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <Overlay>
      <LoadingContainer>
        <Spinner />
        <LoadingText>처리 중...</LoadingText>
      </LoadingContainer>
    </Overlay>
  );
}
