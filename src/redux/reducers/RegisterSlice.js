import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (regData) => {
    try {
      const response = await fetch("http://192.168.1.74:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regData),
      })

      if (!response.ok) {
        throw new Error("registration Failed")
      }

      const data = await response.json()
      console.log("response from backend:", data)
      return data

    } catch (error) {
      console.log('registration',error)
    }
  }
)

const registerSlice = createSlice({
  name: "register",
  initialState: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
    loading: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    clearForm: (state) => {
      state.username = ""
      state.email = ""
      state.password = ""
      state.confirmPassword = ""
      state.errorMessage = ""
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = "registartion failed"
      })
  },
})

export const {
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  setErrorMessage,
  clearForm,
  setLoading
} = registerSlice.actions

export default registerSlice.reducer
