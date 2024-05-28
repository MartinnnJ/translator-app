import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { StyledContainer, StyledTextArea } from "./Input.styled";
import Counter from "@components/Counter/Counter";
import { maxInputLength, sourceTextEmitTime } from "@helpers/constances";
import { breakpointDesktop, inputFieldMobileHeight, inputFieldDesktopHeight } from "@helpers/cssVariables";

type T = {
  onInputTextEmit: (text: string) => void,
};

const Input: React.FC<T> = ({ onInputTextEmit }) => {
  const [inputText, setInputText] = useState('');
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const textAreaRef = useRef(null);
  const textAreaContainerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('keydown', clearTextAreaHandler);
    window.addEventListener('resize', screenResizeHandler);

    return () => {
      window.removeEventListener('keydown', clearTextAreaHandler);
      window.removeEventListener('resize', screenResizeHandler);
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

  useEffect(() => {
    // textarea element autoresize base on its content
    const container = textAreaContainerRef.current! as HTMLDivElement;
    const el = textAreaRef.current! as HTMLTextAreaElement;

    el.style.height = '0px';
    const textAreaScrollHeight = el.scrollHeight + 2;

    if (viewportWidth < parseInt(breakpointDesktop)) {
      if (textAreaScrollHeight > parseInt(inputFieldMobileHeight)) {
        container.style.height = `${textAreaScrollHeight}px`;
      } else {
        container.style.height = `${parseInt(inputFieldMobileHeight)}px`;
      }
    } else {
      if (textAreaScrollHeight > parseInt(inputFieldDesktopHeight)) {
        container.style.height = `${textAreaScrollHeight}px`;
      } else {
        container.style.height = `${parseInt(inputFieldDesktopHeight)}px`;
      }
    }
    
    el.style.height = '100%';
  }, [
    inputText,
    viewportWidth
  ]);

  function clearTextAreaHandler(e: KeyboardEvent) {
    if (
      document.activeElement === textAreaRef.current &&
      e.code === 'Escape'
    ) {
      setInputText('');
    }
  }

  function screenResizeHandler() {
    setViewportWidth(window.innerWidth);
  }

  function inputTextChangeHandler(e: ChangeEvent) {
    const inputEl = e.target as HTMLTextAreaElement;
    setInputText(inputEl.value);
  }

  return (
    <StyledContainer ref={textAreaContainerRef}>
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