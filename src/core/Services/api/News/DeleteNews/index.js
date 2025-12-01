import instance from "../../../../interseptor/Interseptor";

export const DeleteNewsApi = async () => {
    const response = await instance.delete(`/News/DeleteNewsFile${fileId}`)
    return response.data
}