import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";
import useMe from "../hooks/useMe";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

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
  const { me } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = () => {
    authStorage.removeAccessToken();
    console.log("out");
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Link to="/">
          <Text style={styles.textHead}>Repositories</Text>
        </Link>
        {me ? (
          <Pressable onPress={signOut}>
            <Text style={styles.textHead}>Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.textHead}>Sign In</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
