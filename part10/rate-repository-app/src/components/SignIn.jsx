import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  inputContainer: {
    margin: 12,
    width: "90%",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

const SignIn = () => {
  const [signIn, result] = useSignIn();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            form.touched.username &&
              form.errors.username && { borderColor: theme.colors.error },
          ]}
          placeholder="Username"
          value={form.values.username}
          onChangeText={form.handleChange("username")}
        />
        {form.touched.username && form.errors.username && (
          <Text color="error">{form.errors.username}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            form.touched.password &&
              form.errors.password && { borderColor: theme.colors.error },
          ]}
          placeholder="Password"
          value={form.values.password}
          onChangeText={form.handleChange("password")}
          secureTextEntry
        />
        {form.touched.password && form.errors.password && (
          <Text color="error">{form.errors.password}</Text>
        )}
      </View>
      <Pressable onPress={form.handleSubmit} style={styles.button}>
        <Text color="textSecondary" fontWeight="bold">
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
