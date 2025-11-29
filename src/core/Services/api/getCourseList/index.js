import instance from "../../../interseptor/Interseptor";

export const getProductsCourse = async (apiParams) => {
  const response = await instance.get("/Course/CourseList", {
    params: apiParams,
  });
  return response.data;
};
