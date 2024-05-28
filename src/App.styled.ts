import styled from "styled-components";
import {
  breakpointTablet,
  breakpointDesktop,
  gapSize,
  mobileWebsitePadding,
  tabletWebsitePadding
} from "@helpers/cssVariables";

export const StyledWrapper = styled.div`
  padding: ${mobileWebsitePadding};

  @media (min-width: ${breakpointTablet}) {
    padding: ${tabletWebsitePadding};
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${gapSize};

  @media (min-width: ${breakpointTablet}) {
    flex-direction: row;
  }

  &:last-child {
    flex-direction: column;
    margin-bottom: 50px;

    @media (min-width: ${breakpointDesktop}) {
      flex-direction: row;
    }
  }
`;