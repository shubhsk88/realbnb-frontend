import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const RatingButton = styled(Button)`
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
