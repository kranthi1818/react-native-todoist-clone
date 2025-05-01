import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export  const getAllProjectsForUser = createAsyncThunk('projects',async (userId)=>{
  try {
    const response =  await fetch(`http://10.10.5.246:3000/api/projects/user/${userId}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
       })
    
       if (!response.ok) {
        throw new Error('failed to fetch the projects');
      }
    
      const projectsData = await response.json();
    //   console.log("projects------>",projectsData)
      return projectsData
  } catch (error) {
    console.log(error)
  }
})

export const deleteProject = createAsyncThunk('deleteProject',async(projectId)=>{
   try {
    const response  = await fetch(`http://10.10.5.246:3000/api/projects/${projectId}`,{
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
    }
})

export const {getProjectId} = projectsSlice.actions

export default projectsSlice.reducer
