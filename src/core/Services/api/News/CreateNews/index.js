import instance from "../../../../interseptor/Interseptor";

export const CreateNewsApi = async (formData) => {
  const response = await instance.post("/News/CreateNews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
   console.log(response)
  return response.data
};
