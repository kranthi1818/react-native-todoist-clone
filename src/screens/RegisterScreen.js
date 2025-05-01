import React from "react"

import {
  SafeAreaView,
  TextInput,
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../redux/reducers/RegisterSlice"

import {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  setErrorMessage,
  clearForm,
  setLoading
} from "../redux/reducers/RegisterSlice"

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch()

  const {
    username,
    email,
    password,
    confirmPassword,
    errorMessage,
    loading,
    error,
  } = useSelector((state) => state.register)

  const handleSubmit = () => {

    if (!username.trim()) {
      dispatch(setErrorMessage("name is required"))
      return
    }
  
    if (!email.trim()) {
      dispatch(setErrorMessage("email is required"))
      return
    }
  
    if (!password) {
      dispatch(setErrorMessage("password is required"))
      return
    }
  
    if (password !== confirmPassword) {
      dispatch(setErrorMessage("passwords do not match"))
      return
    }

    const userData = {
      name: username,
      email: email,
      password: password,
    }

    dispatch(registerUser(userData))
      .then((response) => {
        if (response.error) {
          dispatch(setErrorMessage(response.error.message))
        } else {
          navigation.replace("projects")
          dispatch(clearForm())
        }
      })
      .catch((err) => {
        dispatch(setErrorMessage("Enter valid data inside fields"))
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter User Name"
        value={username}
        onChangeText={(text) => dispatch(setUsername(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => dispatch(setEmail(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => dispatch(setPassword(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => dispatch(setConfirmPassword(text))}
      />

      <Text style={styles.errorText}>{errorMessage}</Text>

      <TouchableOpacity style={styles.loginButton}  onPress={handleSubmit}>
        <Text style={styles.loginButtonText} >Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#007BFF", 
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15, 
    marginLeft:15,
    width: "90%", 
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
})
