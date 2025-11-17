// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../../core/interseptor/Interseptor'

export const getData = createAsyncThunk(
  'comments/getData',
  async ({courseId}) => {
    const response = await instance.get(`/Course/GetCourseCommnets/${courseId}`)
    return response.data
  }
)

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    data: [],
    total: 1,
    params: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {

      state.data = action.payload.map(item => ({
        id: item.id,
        courseId: item.courseId,
        user: item.author,
        title: item.title,
        comment: item.describe,
        userId:item.userId,
        date: item.insertDate,
        like: item.likeCount,
        dislike: item.disslikeCount,
        accepted: item.accept
      }))

      state.total = action.payload.length
    })
  }
})

export default commentsSlice.reducer
