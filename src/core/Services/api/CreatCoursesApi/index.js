import instance from "../../../interseptor/Interseptor";

export const postCreateCourse = async (formData) => {
  const response = await instance.post(
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
