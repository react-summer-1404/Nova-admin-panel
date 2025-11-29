import instance from "../../../interseptor/Interseptor";
export const getReserveListUsers = async () => {
  const response = await instance.get("/CourseReserve");
  return response.data;
};