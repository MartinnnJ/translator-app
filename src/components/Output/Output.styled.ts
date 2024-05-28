import styled from "styled-components";
import {
  baseRadius,
  breakpointDesktop,
  inputFieldBorderColor,
  inputFieldMobileHeight,
  inputFieldInnerPadding,
  gapSize,
  inputFieldDesktopHeight,
  inputFieldMobileFontSize,
  inputFieldDesktopFontSize
} from "@helpers/cssVariables";

export const StyledContainer = styled.div`
  position: relative;
  font-size: ${inputFieldMobileFontSize};
  border: 1px solid ${inputFieldBorderColor};
  height: ${inputFieldMobileHeight};
  padding: ${inputFieldInnerPadding};
  border-radius: ${baseRadius};

  small {
    position: absolute;
    bottom: 5px;
    right: 10px;
    cursor: pointer;
  }

  svg {
    font-size: 17px;
    color: grey;
  }

  @media (min-width: ${breakpointDesktop}) {
    width: calc((100% / 2) - (${gapSize} / 2));
    height: ${inputFieldDesktopHeight};
    font-size: ${inputFieldDesktopFontSize};
  }
`;