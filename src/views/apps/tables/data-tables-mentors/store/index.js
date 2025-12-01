// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../../core/interseptor/Interseptor'

export const getData = createAsyncThunk(
  'courseMentor/getData',
  async () => {
    const response = await instance.get(
      "/CourseAssistance"
    )
    return response.data
  }
)

export const courseMentorSlice = createSlice({
  name: 'courseMentor',
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
        userId: item.userId,
        inserDate: item.inserDate,
        assistanceName:item.assistanceName,
      }))

      state.total = action.payload.length
    })
  }
})

export default courseMentorSlice.reducer
