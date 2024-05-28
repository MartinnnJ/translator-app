import styled from "styled-components";
import {
  innerMobilePadding,
  baseRadius,
  selectBorderColor,
  selectBorderColorDisabled,
  fontFamilyDefault,
  focusColor,
  breakpointTablet,
  gapSize,
  breakpointDesktop,
  innerDesktopPadding
} from "@helpers/cssVariables";

type T = { $isOpenable: boolean; $open: boolean; };

export const StyledContainer = styled.div`
  position: relative;
  
  @media (min-width: ${breakpointTablet}) {
    width: calc((100% / 2) - ${gapSize} / 2);
  }
`;

export const StyledLabel = styled.small`
  display: inline-block;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const StyledSelect = styled.div<T>`
  position: ${(props) => props.$isOpenable ? 'relative' : 'static'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid ${(props) => props.$isOpenable ? selectBorderColor : selectBorderColorDisabled};
  border-bottom: 1px solid ${
    (props) => {
      return props.$isOpenable ? props.$open ? 'transparent' : selectBorderColor : selectBorderColorDisabled;
    }
  };
  border-radius: ${baseRadius};
  border-bottom-right-radius: ${(props) => props.$open ? '0' : baseRadius};
  border-bottom-left-radius: ${(props) => props.$open ? '0' : baseRadius};
  padding: ${innerMobilePadding};
  user-select: none;
  cursor: ${(props) => props.$isOpenable ? 'pointer' : 'default'};
  z-index: 11;

  @media (min-width: ${breakpointDesktop}) {
    padding: ${innerDesktopPadding};
  }
`;

export const StyledOptions = styled.div<T>`
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  z-index: 10;
  display: ${(props) => props.$open ? 'block' : 'none'};
  width: 100%;
  padding: ${innerMobilePadding};
  background-color: #fff;
  border: 1px solid ${selectBorderColor};
  border-radius: ${baseRadius};
  border-top-right-radius: ${(props) => props.$open ? '0' : baseRadius};
  border-top-left-radius: ${(props) => props.$open ? '0' : baseRadius};
  user-select: none;

  @media (min-width: ${breakpointTablet}) {
    width: calc(200% + ${gapSize});
    left: calc(-100% - ${gapSize});
    border-top-left-radius: ${baseRadius};

    small {
      display: block;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
      margin: 30px 0;
    }
  }

  @media (min-width: ${breakpointDesktop}) {
    padding: ${innerDesktopPadding};
  }
`;

export const StyledSearch = styled.input`
  width: 100%;
  font-size: 16px;
  padding: .5rem;
  margin-bottom: ${innerMobilePadding};
  border-radius: ${baseRadius};
  border: 1px solid black;
  font-family: ${fontFamilyDefault};

  &:focus {
    border-color: ${focusColor};
    outline: none;
  }

  @media (min-width: ${breakpointDesktop}) {
    margin-bottom: ${innerDesktopPadding};
  }
`;

export const StyledLanguage = styled.div`
  display: inline-block;
  padding: 0.25rem;
  margin: 2px;
  background-color: #f2f2f2;
  border-radius: 3px;
  cursor: pointer;

  @media (min-width: ${breakpointTablet}) {
    border: 1px solid transparent;

    &:hover {
      border: 1px solid grey;
    }
  }
`;