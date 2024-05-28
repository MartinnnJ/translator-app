import React from "react";
import { StyledContainer } from "./Output.styled";
import { FaRegCopy } from "react-icons/fa";

const Output: React.FC<{ text: string }> = ({ text }) => {
  const placeholderText = 'Translated Output';
  const outputText = text || placeholderText;

  async function copyIconClickHandler() {
    if (navigator.clipboard && text.length > 0) {
      try {
        await navigator.clipboard.writeText(text);
      } catch(err) {
        console.log('Unable to copy to the clipboard.');
      }
    }
  }

  return (
    <StyledContainer>
      {outputText}
      {text.length > 0 && (
        <small onClick={copyIconClickHandler}>
          <FaRegCopy />
        </small>
      )}
    </StyledContainer>
  );
};

export default Output;