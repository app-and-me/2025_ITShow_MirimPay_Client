import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 0.5rem;
  border-bottom: 1px solid #808080;
  user-drag: none;
  width: 100%;                
  box-sizing: border-box;    
`;

const Logo = styled.img`
  height: 50px;
  user-drag: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  user-drag: none;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;