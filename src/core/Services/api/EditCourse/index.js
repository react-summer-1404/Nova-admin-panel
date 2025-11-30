import instance from "../../../interseptor/Interseptor";

export const editActiveCourse = async (apiParam) => {
  const response = await instance.put("/Course/ActiveAndDeactiveCourse",apiParam);
  return response.data;
};
export const editExpireCourse = async (apiParam) => {
  const response = await instance.put("/Course/SetExpireCourse",apiParam);
  return response.data;
};
export const editCourse = async (formData) => {
  const response = await instance.put(
    "/Course",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};