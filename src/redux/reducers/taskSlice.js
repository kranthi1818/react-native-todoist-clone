import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getAllTasks = createAsyncThunk("tasks", async (projectId) => {
 try {
  const response = await fetch(`http://192.168.1.74:3000/api/task/project/${projectId}`, {
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
  const response = await fetch(`http://192.168.1.74:3000/api/task/${taskId}`,{
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

export const createTask = createAsyncThunk("createTask",async (taskData)=>{
  try {
   const response = await fetch(`http://192.168.1.74:3000/api/task`,{
     method:'POST',
     headers:{
       "Content-Type": "application/json",
     },
     body:JSON.stringify(taskData)
   })
 
   if (!response.ok) {
     throw new Error("failed to fetch the tasks")
   }
 
   const data = await response.json()
   return data
    
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
    .addCase(createTask.fulfilled,(state,action)=>{
      const newTask =  Array.isArray(action.payload) ? action.payload[0] : action.payload
      state.tasks.push(newTask)       
    })
  },
})
export const {getTaskId} = tasksSlice.actions

export default tasksSlice.reducer
