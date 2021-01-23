import { ElementType, ReactElement, ReactNode } from "react";
import { HStack, Icon, StackProps, Text } from "@chakra-ui/react";

interface IconPairProps extends StackProps {
  icon: ElementType;
  children: ReactNode;
}

export const IconPair = ({
  icon,
  children,
  ...props
}: IconPairProps): ReactElement => (
  <HStack color="gray.400" align="center" spacing={2} {...props}>
    <Icon as={icon} boxSize={6} />
    <Text fontSize="md">{children}</Text>
  </HStack>
);
