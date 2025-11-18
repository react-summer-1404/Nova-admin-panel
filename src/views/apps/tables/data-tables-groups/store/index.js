// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../../core/interseptor/Interseptor'

export const getData = createAsyncThunk(
  'courseGroup/getData',
  async ({courseId,teacherId}) => {
    const response = await instance.get(`/CourseReserve/TeacherId=${teacherId}&CourseId=${courseId}`)
    return response.data
  }
)

export const courseGroupSlice = createSlice({
  name: 'courseGroup',
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
        title: item.groupName,
        groupCapacity:item.groupCapacity,
      }))

      state.total = action.payload.length
    })
  }
})

export default courseGroupSlice.reducer
