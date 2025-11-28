import instance from "../../../interseptor/Interseptor"

export const GetGroupList = async (apiParams) => {
    const response = await instance.get("/CourseGroup",{
        params : apiParams,
    });
    return response.data
}
