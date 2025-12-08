import instance from "../../../../interseptor/Interseptor";

export const DeleteNewsApi = async (fileId) => {
  console.log("Deleting fileId:", fileId);
  const response = await instance.delete("/News/DeleteNewsFile", {
    params: { fileId },
  });
  return response.data;
};
