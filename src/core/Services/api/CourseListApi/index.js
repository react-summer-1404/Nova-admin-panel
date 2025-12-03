import instance from "../../../interseptor/Interseptor";
export const getReserveListUsers = async () => {
  const response = await instance.get("/CourseReserve");
  return response.data;
};
export const listCoursePayment = async () => {
  const response = await instance.get("/CoursePayment/ListOfWhoIsPay");
  return response.data;
};
export const listMyCourse = async (apiParams) => {
  const response = await instance.get("/SharePanel/GetMyCourses",{
    params:apiParams
  });
  return response.data;
};