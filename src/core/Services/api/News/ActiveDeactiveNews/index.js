import instance from "../../../../interseptor/Interseptor";

export const ActiveDeactiveNewsApi = async (formData) => {
  const response = await instance.put("/News/ActiveDeactiveNews", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data
};
