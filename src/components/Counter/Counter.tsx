import React from "react";
import { StyledCounter } from "./Counter.styled";

type T = {
  maxLength: number,
  length: number,
};

const Counter: React.FC<T> = ({ maxLength, length }) => {
  return (
    <StyledCounter>
      {length} / {maxLength}
    </StyledCounter>
  )
};

export default Counter;