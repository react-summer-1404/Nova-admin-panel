import instance from "../../../../interseptor/Interseptor";

export const UpdateNewsCategoryApi = async (formData) => {
  const response = await instance.put("/News/UpdateNewsCategory", formData,{
    headers:{"Content-Type":"multipart/form-data"}
  });
  return response.data
};
