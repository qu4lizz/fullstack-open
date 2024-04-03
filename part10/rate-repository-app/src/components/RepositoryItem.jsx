import { View, StyleSheet, Image } from "react-native";
import { Stat } from "./Stat";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    direction: "column",
    gap: 20,
  },
  flexItemUp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    gap: 15,
  },
  flexItemDown: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },
  language: {
    padding: 5,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
});

export const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexItemUp}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={{ width: 50, height: 50 }}
        />
        <View style={styles.info}>
          <Text color="textTernary" fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text>{item.description}</Text>
          <Text
            backgroundColor="primary"
            color="textSecondary"
            style={styles.language}
          >
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.flexItemDown}>
        <Stat name={"Stars"} value={item.stargazersCount} />
        <Stat name={"Forks"} value={item.forksCount} />
        <Stat name={"Reviews"} value={item.reviewCount} />
        <Stat name={"Rating"} value={item.ratingAverage} />
      </View>
    </View>
  );
};
