import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const style = css`
  color: white;
  background-color: black;
  font-weight: bold;
  &:hover,
  &:focus {
    background-color: #1a202c;
  }

  border-radius: 10px;
  padding: 0.8rem 4rem;
`;

export const ButtonPrimary = styled(Button)`
  ${style}
`;
