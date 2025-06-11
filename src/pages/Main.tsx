import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainImage from '../assets/Main.png';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-image: url(${MainImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    padding: 3rem;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 9999px;
    padding: 1rem 3rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: white;
      color: #4c9964;
    }
`;

const Main: React.FC = () => {
    const navigate = useNavigate();

    const goNext = () => {
        navigate('/');
    };

    return (
        <>
          <Container>
            <ButtonWrapper>
              <Button onClick={goNext}>주문하기</Button>
            </ButtonWrapper>
          </Container>
        </>
    );
};

export default Main;
