import instance from "../../../interseptor/Interseptor";
export const getCreateCourse = async () => {
  const response = await instance.get("/Course/GetCreate");
  return response.data;
};
