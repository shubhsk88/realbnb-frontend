import { Button, IconButton } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const style = () => css`
  color: white;
  background-color: rgba(0, 0, 0, 0.2);

  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.3);
  }

  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const ButtonOpaque = styled(Button)`
  ${style}
`;

export const IconButtonOpaque = styled(IconButton)`
  ${style}
`;
