// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../../core/interseptor/Interseptor'

export const getData = createAsyncThunk(
  'courseUsers/getData',
  async ({courseId}) => {
    const response = await instance.get(`/CourseReserve/${courseId}`)
    return response.data
  }
)

export const courseUsersSlice = createSlice({
  name: 'courseUsers',
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
        user: item.studentName,
        title: item.courseName,
        accepted: item.accept
      }))

      state.total = action.payload.length
    })
  }
})

export default courseUsersSlice.reducer
