import instance from "../../../interseptor/Interseptor"

export const getGroupList = async (apiParams) => {
    const response = await instance.get("/CourseGroup",{
        params : apiParams,
    });
    return response.data
}
