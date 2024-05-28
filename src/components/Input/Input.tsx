import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { StyledContainer, StyledTextArea } from "./Input.styled";
import Counter from "@components/Counter/Counter";
import { maxInputLength, sourceTextEmitTime } from "@helpers/constances";

type T = {
  onInputTextEmit: (text: string) => void,
};

const Input: React.FC<T> = ({ onInputTextEmit }) => {
  const [inputText, setInputText] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', clearTextAreaHandler);

    return () => {
      window.removeEventListener('keydown', clearTextAreaHandler);
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onInputTextEmit(inputText);
    }, sourceTextEmitTime);

    return () => {
      clearTimeout(timerId);
    }
  }, [
    inputText,
    onInputTextEmit
  ]);

  function clearTextAreaHandler(e: KeyboardEvent) {
    if (
      document.activeElement === textAreaRef.current &&
      e.code === 'Escape'
    ) {
      setInputText('');
    }
  }

  function inputTextChangeHandler(e: ChangeEvent) {
    const inputEl = e.target as HTMLTextAreaElement;
    setInputText(inputEl.value);
  }

  return (
    <StyledContainer>
      <StyledTextArea
        onChange={inputTextChangeHandler}
        value={inputText}
        placeholder="Source Input"
        ref={textAreaRef}
      ></StyledTextArea>
      <Counter
        length={inputText.length}
        maxLength={maxInputLength}
      />
    </StyledContainer>
  );
}

export default Input;