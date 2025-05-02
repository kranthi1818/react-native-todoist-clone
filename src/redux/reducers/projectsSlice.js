import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export  const getAllProjectsForUser = createAsyncThunk('projects',async (userId)=>{
  try {
    const response =  await fetch(`http://192.168.1.74:3000/api/projects/user/${userId}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
       })
    
       if (!response.ok) {
        throw new Error('failed to fetch the projects');
      }
    
      const projectsData = await response.json();
      return projectsData
  } catch (error) {
    console.log(error)
  }
})

export const deleteProject = createAsyncThunk('deleteProject',async(projectId)=>{
   try {
    const response  = await fetch(`http://192.168.1.74:3000/api/projects/${projectId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error('failed to delete the project');
      }
      console.log(projectId)
      return projectId
   } catch (error) {
    console.log(error)
   }
})

export const createProject = createAsyncThunk(
    "project/createProject",
    async (projectData, { rejectWithValue }) => {
      try {
        const response = await fetch("http://192.168.1.74:3000/api/projects", {
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


const projectsSlice = createSlice({
    name:'projects',
    initialState:{
        loading:false,
        error:null,
        projects:[],
        projectID:null,
        isFavorite:null
    },
    reducers:{
        getProjectId:(state,action)=>{
            state.projectID = action.payload
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProjectsForUser.pending,(state)=>{
            state.loading = false
        })
        .addCase(getAllProjectsForUser.fulfilled,(state,action)=>{
            state.projects = action.payload
            state.error = null
            state.loading = false
        })
        .addCase(getAllProjectsForUser.rejected,(state,action)=>{
            state.loading = false
            state.error = action.error.message
        })
        .addCase(deleteProject.fulfilled, (state, action) => {
            state.projects = state.projects.filter(project => project.id !== action.payload)
            state.error = null
          })
          .addCase(createProject.fulfilled, (state, action) => {
            const newProject = Array.isArray(action.payload) ? action.payload[0] : action.payload
            state.projects.push(newProject)         
         })
    }
})

export const { getProjectId } = projectsSlice.actions

export default projectsSlice.reducer
