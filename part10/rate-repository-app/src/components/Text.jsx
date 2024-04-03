import React from "react";
import { Text as NativeText, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextTernary: {
    color: theme.colors.textTernary,
  },
  colorBackgroundPrimary: {
    backgroundColor: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeMid: {
    fontSize: theme.fontSizes.mid,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  backgroundColor,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "textTernary" && styles.colorTextTernary,
    backgroundColor === "primary" && styles.colorBackgroundPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontSize === "mid" && styles.fontSizeMid,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
