// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";
import instance from "../../../../../core/interseptor/Interseptor";

export const getData = createAsyncThunk(
  "coursePayment/getData",
  async ({ courseId }) => {
    const response = await instance.get(`/CoursePayment?CourseId=${courseId}`);
    return response.data;
  }
);

export const coursePaymentSlice = createSlice({
  name: "coursePayment",
  initialState: {
    data: [],
    total: 1,
    params: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      console.log("Payload from API:", action.payload); 
      state.data = action.payload.map(item => ({
        id: item.id,
        courseId: item.courseId,
        PeymentDate :item.PeymentDate,
        instertDate:item.instertDate,
        PaymentInvoiceNumber:item.PaymentInvoiceNumber,
        Paid:item.Paid,
        accepted: item.accept,
        studentId:item.studentId
      }));
      state.total = action.payload.length;
    });
    
  },
});

export default coursePaymentSlice.reducer;
