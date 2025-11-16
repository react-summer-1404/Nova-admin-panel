// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import instance from '../../../../core/interseptor/Interseptor'
export const getProducts = createAsyncThunk('courses/getList', async params => {
  const response = await instance.get('/Course/CourseList', { params })
  return { params, data: response.data }
})
export const addToCart = createAsyncThunk('appEcommerce/addToCart', async (id, { dispatch, getState }) => {
  const response = await axios.post('/apps/ecommerce/cart', { productId: id })
  await dispatch(getProducts(getState().ecommerce.params))
  return response.data
})

export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async () => {
  const response = await axios.get('/apps/ecommerce/wishlist')
  return response.data
})

export const deleteWishlistItem = createAsyncThunk('courses/deleteFavorites', async (id, { dispatch }) => {
  const formData = new FormData()
  formData.append('CourseFavoriteId', id)
  const response = await instance.delete('/Course/DeleteCourseFavorite', {
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  dispatch(getWishlistItems())
  return response.data
})

export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async () => {
  const response = await axios.get('/apps/ecommerce/cart')
  return response.data
})

export const getProduct = createAsyncThunk(
  'appCourses/getProduct',
  async id => {
    const response = await instance.get(`/Course/${id}`)
    return response.data
  }
)

export const addToWishlist = createAsyncThunk('courses/addFavorites', async id => {
  await instance.post('/Course/AddCourseFavorite', { courseId: id })
  return id
})

export const deleteCartItem = createAsyncThunk('appEcommerce/deleteCartItem', async (id, { dispatch }) => {
  await axios.delete(`/apps/ecommerce/cart/${id}`)
  dispatch(getCartItems())
  return id
})

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(getProducts.fulfilled, (state, action) => {
      state.params = action.payload.params
    
      state.products = action.payload.data.courseDtos?.map(course => ({
        id: course.courseId,
        name: course.title,
        image: course.imageAddress,
        price: course.cost,
        brand: course.fullName,
        slug: course.courseId, 
        description: course.describe, 
        rating:course.active

      }))
    
      state.totalProducts = action.payload.data.totalCount
    })
      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.favoriteCourseDto
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload
      })
  }
})

export default appEcommerceSlice.reducer
