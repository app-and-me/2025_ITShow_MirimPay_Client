import React from "react";
import styled from "styled-components";
import Button from "./Button";

interface Product {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  product: Product;
  onQuantityChange: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
}

const Item = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d7d7d7;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  margin: 1rem -1rem;
  height: 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.span`
  font-weight: 500;
  color: #3f3f3f;
  font-size: 0.85em;
`;

const Price = styled.span`
  font-size: 1rem;
  color: #208d4e;
  font-weight: 600;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;

const Quantity = styled.span`
  width: 1.5rem;
  text-align: center;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 3px;
  left: 0;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #67726c;
  color: white;
  font-size: 1rem;
  border: 4px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.span`
  position: relative;
  top: -1px;
`;

const ProductItem: React.FC<Props> = ({ product, onQuantityChange, onRemove }) => {
  return (
    <Item>
      <RemoveButton onClick={() => onRemove(product.productId)}><Icon>×</Icon></RemoveButton>

      <Info>
        <Name>{product.name}</Name>
        <Price>{product.price.toLocaleString()}원</Price>
      </Info>

      <Controls>
  <Button
    variant="minus"
    onClick={() => onQuantityChange(product.productId, -1)}
    $active={product.quantity >= 2}
  >
    -
  </Button>
  <Quantity>{product.quantity}</Quantity>
  <Button
    variant="plus"
    onClick={() => onQuantityChange(product.productId, 1)}
  >
    +
  </Button>
</Controls>

    </Item>
  );
};


export default ProductItem;