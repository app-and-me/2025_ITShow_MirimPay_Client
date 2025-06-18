import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainImage from '../assets/Main.png';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #249D57;
    background-image: url(${MainImage});
    background-size: cover;
    background-position: left center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    min-height: 100vh;
    min-height: 100dvh;

    @media (max-aspect-ratio: 3/4) {
        background-size: auto 100%;
        background-position: left center;
    }
    
    @media (min-aspect-ratio: 1/1) and (max-aspect-ratio: 4/3) {
        background-size: cover;
        background-position: center left;
    }
    
    @media (min-aspect-ratio: 16/9) {
        background-size: cover;
        background-position: center center;
    }

    @media (max-width: 480px) and (orientation: portrait) {
        background-size: auto 100%;
        background-position: left center;
    }

    @media (max-width: 360px) {
        background-size: auto 100%;
        background-position: left center;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    padding: 3rem;
    display: flex;
    justify-content: center;
    z-index: 1;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        padding: 2rem 1rem;
        padding-bottom: max(2rem, env(safe-area-inset-bottom));
    }
    
    @media (max-height: 600px) {
        padding: 1.5rem;
    }
`;

const Button = styled.button`
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    height: 70px;
    width: 250px;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 100px;
    padding: 1rem 3rem;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    

    &:hover {
        background-color: white;
        color: #4c9964;
    }
    
    @media (hover: none) {
        &:active {
            background-color: white;
            color: #4c9964;
        }
    }
`;

const Main: React.FC = () => {
    const navigate = useNavigate();

    const goNext = () => {
        navigate('/');
    };

    return (
        <Container>
            <ButtonWrapper>
                <Button onClick={goNext}>주문하기</Button>
            </ButtonWrapper>
        </Container>
    );
};

export default Main;