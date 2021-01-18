import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const style = css`
  color: white;
  background-color: #000000;
  font-weight: bold;
  transform: scale(1);
  transition: all 0.2s;

  &:hover,
  &:focus {
    background-color: #2d3748;
    transform: scale(1.04);
  }

  &:active {
    background-color: #171923;
  }

  border-radius: 10px;
  padding: 0.8rem 4rem;
`;

export const ButtonPrimary = styled(Button)`
  ${style}
`;
