import instance from "../../../../interseptor/Interseptor";

export const UpdateNewsApi = async (formData) => {
  const response = await instance.put("/News/UpdateNews", formData,{
    headers:{"Content-Type":"multipart/form-data"}
  });
  return response.data
};
