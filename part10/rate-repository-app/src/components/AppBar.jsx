import { View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 60,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textHead: {
    color: theme.colors.textSecondary,
    fontSize: 24,
    fontWeight: "bold",
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Link to="/">
          <Text style={styles.textHead}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.textHead}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
