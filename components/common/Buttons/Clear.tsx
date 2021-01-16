import { IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const style = css`
  color: white;
  background-color: transparent;

  &:hover,
  :focus {
    color: #e2e8f0;
    background-color: transparent;
  }

  &:active {
    color: #cbd5e0;
    background-color: transparent;
  }
`;

export const IconButtonClear = styled(IconButton)`
  ${style}
`;
