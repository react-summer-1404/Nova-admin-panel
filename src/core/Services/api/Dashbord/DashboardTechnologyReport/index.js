import instance from "../../../../interseptor/Interseptor";

export const getTechReport = async () => {
    const response = await instance.get("/Report/DashboardTechnologyReport");
    return response.data
}