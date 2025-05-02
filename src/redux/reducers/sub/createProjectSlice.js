import { createSlice } from "@reduxjs/toolkit"


const projectSlice = createSlice({
  name: "createProject",
  initialState: {
    name: "",
    color: "",
    modalVisible:false,
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
    setModalVisible:(state,action)=>{
      state.modalVisible = action.payload
    }
  },
})

export const {
  setProjectName,
  setProjectColor,
  setFavourite,
  resetProjectForm,
  setModalVisible,
} = projectSlice.actions

export default projectSlice.reducer
