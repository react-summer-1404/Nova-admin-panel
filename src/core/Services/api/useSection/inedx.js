import instance from "../../../interseptor/Interseptor";
export const getUserList = async (apiParams) => {
  const response = await instance.get("/CourseUser/GetCourseUserList", {
    params: apiParams,
  });
  return response.data;
};
