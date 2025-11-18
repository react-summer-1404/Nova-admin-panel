// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../../core/interseptor/Interseptor'

export const getData = createAsyncThunk(
  'courseSocialGroup/getData',
  async () => {
    const response = await instance.get("/CourseSocialGroup")
    console.log("response", response.data) 
    return response.data
  }
)

export const courseSocialGroupSlice = createSlice({
  name: 'courseSocialGroup',
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
        groupLink: item.groupLink,
        groupName: item.groupName,
      }))
      console.log("action.payload",action.payload)

      state.total = action.payload.length
    })
  }
})

export default courseSocialGroupSlice.reducer
