import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#38B2AC",
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
};

const textStyles = {
  label: {
    fontSize: "md",
    fontWeight: "medium",
    color: "gray.400",
  },
  labelLight: {
    fontsize: "md",
    fontWeight: "regular",
    color: "gray.400",
  },
};

const theme = extendTheme({
  fontWeights,
  colors,
  textStyles,
});

export default theme;
