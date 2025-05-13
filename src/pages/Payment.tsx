import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";
import GlobalStyle from "../styles/GlobalStyle";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity, totalPrice } = location.state || { totalQuantity: 0, totalPrice: 0 };

  const goBack = () => navigate(-1);
  const goNext = () => {
    alert("다음 단계로 이동"); // 원하는 동작으로 바꿔도 됨
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Footer totalQuantity={totalQuantity} totalPrice={totalPrice}>
        <div style={{ display: "flex", width: "100%", gap: "15px" }}>
          <Button variant="back" onClick={goBack}>이전</Button>
          <Button variant="next" onClick={goNext}>다음</Button>
      </div>
      </Footer>
    </>
  );
}
