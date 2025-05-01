import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk('auth/loginUser', async (userData,{ rejectWithValue }) => {
 try {
  const response = await fetch('http://10.10.5.246:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    if (response.status === 400) {
      return rejectWithValue("email or password is incorrect");
    }
    return rejectWithValue("login failed please try again");
  }
  const loginData = await response.json() 
  console.log("loginData: ", loginData);
  return loginData

 } catch (error) {
  return rejectWithValue("network error please try again later");
}
  
})

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email:'',
    password:'',
    loading: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {
    setEmail:(state,action)=>{
      state.email = action.payload
    },
    setPassword:(state,action)=>{
      state.password = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { 
          userId: action.payload.userId, 
          name: action.payload.userName
        }
        state.token = action.payload.token;
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error =  "Email and Password is incorrect"
      })
  },
});

export const {setEmail,setPassword,setError} = loginSlice.actions

export default loginSlice.reducer;
