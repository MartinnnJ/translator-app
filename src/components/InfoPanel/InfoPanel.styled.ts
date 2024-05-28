import styled from "styled-components";
import {
  breakpointDesktop,
  breakpointTablet,
  innerDesktopPadding,
  innerMobilePadding
} from "@helpers/cssVariables";

type T = { $status: number };

export const StyledContainer = styled.div<T>`
  margin: ${innerMobilePadding} 0;

  small {
    display: block;
    padding: 5px;
  }

  strong {
    margin-left: 5px;
  }

  .api {
    color: ${(props) => props.$status === 1 ? 'red' : 'black'};
  }

  @media (min-width: ${breakpointTablet}) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${breakpointDesktop}) {
    margin: ${innerDesktopPadding} 0;

    small {
      font-size: 15px;
    }
  }
`;