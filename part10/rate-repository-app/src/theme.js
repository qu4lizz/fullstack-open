import { Platform } from "react-native";

const theme = {
  colors: {
    primary: "#0366d6",
    background: "#e1e4e8",
    appBarBackground: "#24292e",
    itemBackground: "#eeeeee",
    textPrimary: "#5b5b5b",
    textSecondary: "#f3f3f3",
    textTernary: "#242729",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    mid: 16,
    subheading: 18,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
