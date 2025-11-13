import instance from "../../../../interseptor/Interseptor"

export const getReport = async () => {
    const response = await instance.get("/Report/DashboardReport");
    return response.data
}