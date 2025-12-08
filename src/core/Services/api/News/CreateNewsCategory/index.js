import instance from "../../../../interseptor/Interseptor";

export const CreateNewsCategoryApi = async (formData) => {
  const response = await instance.post("/News/CreateNewsCategory", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  return response.data
};
