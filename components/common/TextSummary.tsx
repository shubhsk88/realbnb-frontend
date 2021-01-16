import { ReactElement, useState } from "react";
import { Text, Button } from "@chakra-ui/react";

interface TextProps {
  noOfLines?: number;
  children: ReactElement | ReactElement[] | string;
}

export const TextSummary = ({
  noOfLines = 3,
  children,
}: TextProps): ReactElement => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);

  return (
    <>
      <Text noOfLines={isTruncated ? noOfLines : 0}>{children}</Text>
      <Button
        onClick={() => setIsTruncated((prev) => !prev)}
        variant="link"
        size="sm"
        color="primary"
      >
        {isTruncated ? "More..." : "Less"}
      </Button>
    </>
  );
};
