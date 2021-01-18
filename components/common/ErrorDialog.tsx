import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

import React from "react";

export const ErrorDialog = ({ error = "" }: { error: string }) => {
  return (
    <Alert status="error" my={3} borderRadius="md">
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
    </Alert>
  );
};
