// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../core/interseptor/Interseptor' 

export const getProducts = createAsyncThunk('courses/getList', async params => {
  const response = await instance.get('/Course/CourseList', { params }) 
  return { params, data: response.data }
})

// get product detail
export const getProduct = createAsyncThunk(
  'appCourses/getProduct',
  async id => {
    const response = await instance.get(`/Course/${id}`)
    return response.data
  }
)



export const appEcommerceSlice = createSlice({
  name: 'ecommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {},
    selectedFilter: "all",
    selectedSort :"asc",
    selectedSortCol :"active"
  },
  reducers: {
    setCourseList: (state, action) => {
      state.params = action.payload.params
    
      state.products = action.payload.data.mappedData
state.totalProducts = action.payload.data.totalCount

    },
    setSelectedFilter: (state, action) => {
      state.selectedFilter = action.payload    
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload    
    },
    setSelectedSortCol: (state, action) => {
      state.selectedSortCol = action.payload    
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getProducts.fulfilled, (state, action) => {
      state.params = action.payload.params
  // product card information
      state.products = action.payload.data.courseDtos?.map(course => ({
        id: course.courseId,
        name: course.title,
        image: course.imageAddress,
        price: course.cost,
        slug: course.courseId,
        description: course.describe,
        miniDescribe : course.miniDescribe,
        fullName : course.fullName,
        active: course.active,
        lastUpdate:course.lastUpdate?.slice(0,10),
        isExpire:course.isExpire
      })) || []
  
      state.totalProducts = action.payload.data.totalCount
  })
  
  //  product detail information
    .addCase(getProduct.fulfilled, (state, action) => {
      const courseDetail = action.payload; 
      state.productDetail = {
        id: courseDetail.courseId,
        name: courseDetail.title,
        image: courseDetail.imageAddress,
        price: courseDetail.cost,
        teacherName: courseDetail.teacherName,
        teacherId:courseDetail.teacherId,
        slug: courseDetail.courseId,
        description: courseDetail.describe,
        rating: courseDetail.currentRate,
        active :courseDetail.active,
        statusName:courseDetail.statusName,
        currentRate: courseDetail.currentRate,
        startTime: courseDetail.startTime,
        endTime: courseDetail.endTime,
        courseTeches: courseDetail.courseTeches,
        miniDescribe: courseDetail.miniDescribe,
        courseCommentTotal:courseDetail.courseCommentTotal,
        reserveUserTotal :courseDetail.reserveUserTotal,
        courseGroupTotal :courseDetail.courseGroupTotal,
      }
    })
    
  }
})

export const { setCourseList, setSelectedFilter,setSelectedSort,setSelectedSortCol } = appEcommerceSlice.actions
export default appEcommerceSlice.reducer
