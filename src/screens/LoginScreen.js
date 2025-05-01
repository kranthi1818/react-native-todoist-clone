import {
  View,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native"

import React from "react"

import { useSelector, useDispatch } from "react-redux"
import { loginUser } from "../redux/reducers/loginSlice"

import { setEmail, setPassword, setError } from "../redux/reducers/loginSlice"

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch()

  const { email, password, loading, error, user } = useSelector(
    (state) => state.login
  )

  const handleLogin = async () => {
    if (!email && !password) {
      dispatch(setError("email and password are required"))
      return
    } else if (!email) {
      dispatch(setError("email is required"))
      return
    } else if (!password) {
      dispatch(setError("password is required"))
      return
    }

    dispatch(setError(null))

    const result = await dispatch(loginUser({ email, password }))

    if (loginUser.fulfilled.match(result)) {
      navigation.replace("projects")
    } else {
      console.log("Login failed:", result.error.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          dispatch(setEmail(text))
          dispatch(setError(null))
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => {
          dispatch(setPassword(text))
          dispatch(setError(null))
        }}
      />

      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("register")}>
          <Text style={styles.signupText}>do not have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding:10
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#007BFF", 
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15, 
    width: "90%", 
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "blue",
    textDecorationLine: "none",
    fontSize: 14,
  },
})
