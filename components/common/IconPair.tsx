import { ElementType, ReactElement, ReactNode } from "react";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";

interface IconPairProps extends FlexProps {
  icon: ElementType;
  children: ReactNode;
}

export const IconPair = ({
  icon,
  children,
  ...props
}: IconPairProps): ReactElement => (
  <Flex color="gray.400" fontSize="md" alignItems="center" {...props}>
    <Icon as={icon} h={6} w={6} mr="0.5rem" />
    <p>{children}</p>
  </Flex>
);
