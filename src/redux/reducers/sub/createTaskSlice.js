import { createSlice } from "@reduxjs/toolkit"

const TaskSlice = createSlice({
  name: "createTask",
  initialState: {
    content: "",
    description: "",
    dueDate: null,
    isCompleted: false,
    modalVisible: false,
    loading: false,
    error: null,
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload
    },
    setIsCompleted: (state, action) => {
      state.isCompleted = action.payload
    },
    resetTaskForm: (state) => {
      state.content = ""
      state.description = ""
      state.isCompleted = false
      state.error = null
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload
    },
  },
})

export const {
  setContent,
  setDescription,
  setDueDate,
  setIsCompleted,
  resetTaskForm,
  setModalVisible,
} = TaskSlice.actions

export default TaskSlice.reducer
