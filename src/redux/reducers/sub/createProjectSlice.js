import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const createProject = createAsyncThunk(
  "project/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://10.10.5.246:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      if (!response.ok) {
        throw new Error("Project creation failed")
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const projectSlice = createSlice({
  name: "createProject",
  initialState: {
    name: "",
    color: "",
    isFavourite: false,
    loading: false,
    error: null,
  },
  reducers: {
    setProjectName: (state, action) => {
      state.name = action.payload
    },
    setProjectColor: (state, action) => {
      state.color = action.payload
    },
    setFavourite: (state, action) => {
      state.isFavourite = action.payload
    },
    resetProjectForm: (state) => {
      state.name = ""
      state.color = ""
      state.isFavourite = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  setProjectName,
  setProjectColor,
  setFavourite,
  resetProjectForm,
} = projectSlice.actions

export default projectSlice.reducer
