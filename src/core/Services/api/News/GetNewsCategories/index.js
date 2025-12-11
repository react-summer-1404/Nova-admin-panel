import instance from './../../../../interseptor/Interseptor';

export const GetNewsCategories = async () => {
    const response = await instance.get("/News/GetListNewsCategory")
    return response.data
}
export const GetNewsCategoriesDetail = async (id) => {
    const response = await instance.get(`/News/GetNewsCategory/${id}`)
    return response.data
}