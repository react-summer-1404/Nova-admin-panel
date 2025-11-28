import instance from "../../../interseptor/Interseptor"

export const GetUserList = async (apiParams) => {
    const response = await instance.get("/User/UserMannage",{
        params : apiParams,
    });
    return response.data
}
export const GetStudentList = async (courseId) => {
    const response = await instance.get(`/Course/${courseId}`);
    return response.data
}
export const GetStudentReserveList = async (courseId) => {
    const response = await instance.get(`/CourseReserve/${courseId}`);
    return response.data
}
export const GetAllUserReserveList = async () => {
    const response = await instance.get("/CourseReserve");
    return response.data
}