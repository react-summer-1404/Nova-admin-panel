import instance from "../../../interseptor/Interseptor"

export const GetUserList = async (apiParams) => {
    const response = await instance.get("/User/UserMannage",{
        params : apiParams,
    });
    return response.data
}