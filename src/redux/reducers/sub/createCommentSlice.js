import { createSlice } from "@reduxjs/toolkit"

const CommentSlice = createSlice({
  name: "createComment",
  initialState: {
    content: "",
    modalVisible:false,
    loading: false,
    error: null,
  },
  
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload
    },
    resetTaskForm: (state) => {
      state.content = ""
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload
    },
  },
})

export const {
  setContent,
  resetTaskForm,
  setModalVisible,
} = CommentSlice.actions

export default CommentSlice.reducer
