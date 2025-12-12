import instance from "../../../../interseptor/Interseptor";

export const AddReplyCourseCommentApi = async (formData) => {
  const response = await instance.post("/Course/AddReplyCourseComment", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data
};
