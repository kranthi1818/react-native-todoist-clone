import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getAllComments = createAsyncThunk("comments", async (taskId) => {
  try {
    const response = await fetch(
      `http://192.168.1.74:3000/api/comments/task/${taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("failed to fetch the comments")
    }

    const commentsData = await response.json()
    return commentsData
  } catch (error) {
    console.log(error)
  }
})

export const deleteComment = createAsyncThunk(
  "deleteComment",
  async (commentId) => {
    try {
      const response = await fetch(
        `http://192.168.1.74:3000/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error("failed to fetch the tasks")
      }

      return commentId
    } catch (error) {
      console.log(error)
    }
  }
)

export const createComment = createAsyncThunk("createComment", async ({projectID,taskId,commentData}) => {
  try {
    const response = await fetch(
      `http://192.168.1.74:3000/api/comments/${projectID}/${taskId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(commentData)
      }
    )

    if (!response.ok) {
      throw new Error("failed to create the comments")
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.log(error)
  }
})


const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    loading: false,
    error: null,
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.comments = action.payload
        state.error = null
        state.loading = false
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((item) => item.id !== action.payload)
      })
      .addCase(createComment.fulfilled, (state, action) => {
         const  newComment = Array.isArray(action.payload) ? action.payload[0] : action.payload
         state.comments.push(newComment)    
      })
  },
})

export default commentsSlice.reducer
