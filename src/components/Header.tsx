import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png"; // 정확한 경로 확인

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 0.5rem;
  border-bottom: 1px solid #808080;
`;

const Logo = styled.img`
  height: 50px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" />
    </HeaderContainer>
  );
};

export default Header;
