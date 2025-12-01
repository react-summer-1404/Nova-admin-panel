import instance from "../../../interseptor/Interseptor";
export const getLevelList = async () => {
  const response = await instance.get("/CourseLevel/GetAllCourseLevel");
  return response.data;
};

export const postLevelList = async (apiData) => {
  const response = await instance.post("/CourseLevel",apiData);
  return response.data;
};
