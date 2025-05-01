import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getAllTasks = createAsyncThunk("tasks", async (projectId) => {
 try {
  const response = await fetch(`http://10.10.5.246:3000/api/task/project/${projectId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("failed to fetch the tasks")
  }

  const tasksData = await response.json()
  return tasksData
 } catch (error) {
  console.log(error)
 }
})

export const deleteTask = createAsyncThunk("deleteTask",async (taskId)=>{
 try {
  const response = await fetch(`http://10.10.5.246:3000/api/task/${taskId}`,{
    method:'DELETE',
    headers:{
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("failed to fetch the tasks")
  }

  return taskId

 } catch (error) {
  console.log(error)
 }
})

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    loading: false,
    error: null,
    tasks: [],
    taskId:null
  },
  reducers: {
    getTaskId:(state,action)=>{
      state.taskId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllTasks.pending, (state) => {
      state.loading = false
    })
    .addCase(getAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
      state.error = null
      state.loading = false
    })
    .addCase(getAllTasks.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    .addCase(deleteTask.fulfilled,(state,action)=>{
      state.tasks = state.tasks.filter((item)=> item.id !== action.payload )
    })
  },
})
export const {getTaskId} = tasksSlice.actions

export default tasksSlice.reducer
