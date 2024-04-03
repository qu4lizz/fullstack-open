import { StyleSheet, View } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const Stat = ({ name, value }) => {
  const getValue = () => {
    if (value < 1000) {
      return value;
    } else if (value >= 1000 && value < 1000000) {
      return (value / 1000).toFixed(1) + "k";
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
  };

  return (
    <View style={styles.container}>
      <Text color="textTernary" fontWeight="bold" fontSize="mid">
        {getValue()}
      </Text>
      <Text>{name}</Text>
    </View>
  );
};
