import instance from "../../../interseptor/Interseptor";

export const getProducts = async (apiParams) => {
  const response = await instance.get("/Course/CourseList", {
    params: apiParams,
  });
  return response.data;
};
