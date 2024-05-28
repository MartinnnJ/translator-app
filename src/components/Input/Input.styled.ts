import styled from "styled-components";
import {
  baseRadius,
  breakpointDesktop,
  fontFamilyDefault,
  inputFieldBorderColor,
  inputFieldMobileHeight,
  inputFieldInnerPadding,
  gapSize,
  sourceInputBgColor,
  inputFieldDesktopHeight,
  inputFieldMobileFontSize,
  inputFieldDesktopFontSize
} from "@helpers/cssVariables";

export const StyledContainer = styled.div`
  position: relative;
  height: ${inputFieldMobileHeight};

  @media (min-width: ${breakpointDesktop}) {
    width: calc((100% / 2) - (${gapSize} / 2));
    height: ${inputFieldDesktopHeight};
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: ${inputFieldMobileFontSize};
  font-family: ${fontFamilyDefault};
  background-color: ${sourceInputBgColor};
  border-radius: ${baseRadius};
  border: 1px solid ${inputFieldBorderColor};
  padding: ${inputFieldInnerPadding};
  padding-bottom: calc(${inputFieldInnerPadding} + 15px);
  resize: none;

  &::placeholder {
    font-size: ${inputFieldMobileFontSize};
    font-family: ${fontFamilyDefault};
  }

  &:focus {
    border-color: #007FFF;
    outline: none;
  }

  @media (min-width: ${breakpointDesktop}) {
    font-size: ${inputFieldDesktopFontSize};

    &::placeholder {
      font-size: ${inputFieldDesktopFontSize};
    }
  }
`;