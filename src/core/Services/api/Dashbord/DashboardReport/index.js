import instance from "../../../../interseptor/Interseptor"

export const getReport = async () => {
    const response = await instance.get("/Report/DashboardReport");
    return response.data
}
export const GetCommentTotal = async () => {
    const response = await instance.get("/Course/CommentManagment");
    return response.data;
};

export const GetDataCount = async () => {
    const response = await instance.get("/User/UserMannage");
    return response.data;
};

export const GetCourseCount = async () => {
    const response = await instance.get("/Home/GetCoursesWithPagination");
    return response.data;
};