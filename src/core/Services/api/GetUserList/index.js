import instance from "../../../interseptor/Interseptor"

export const GetUserList = async (apiParams) => {
    const response = await instance.get("/User/UserMannage",{
        params : apiParams,
    });
    return response.data;
}

export const GetUserDetail = async (UserId) => {
    console.log("response.data",response.data)

    const response = await instance.get(`/User/UserDetails/${UserId}`)
    return response.data;
}

export const CreateUser = async(data) => {
    const response = await instance.post("/User/CreateUser", data)
    return response.data
}

export const UpdateUser = async (data) => {
    const response = await instance.put("/User/UpdateUser",data)
    return response.data
}
export const DeleteUser = async(id) => {
    const response = await instance.delete(`/User/DeleteUser`, {data: id})
    return response.data
}

export const ReverseToActiveUser = async(id) => {
    const response = await instance.put(`User/ReverseToActiveUser${id}`)
    return response.data
}

export const AddUserAccess = async (data) => {
    const response = await instance.post("/User/AddUserAccess", data)
    return response.data
}

export const CommentManagment = async() => {
    const response = await instance.get("/Course/CommentManagment",{
        params
    })
    return response.data
}