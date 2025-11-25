import instance from "../../../interseptor/Interseptor"

export const GetUserList = async (apiParams) => {
    const response = await instance.get("/User/UserMannage",{
        params : apiParams,
    });
    return response.data;
}

export const GetUserDetail = async (UserId) => {
    const response = await instance.get(`/User/UserDetails/${UserId}`)
    return response.data;
    console.log("response.data",response.data)
}

export const CreateUser = async(data) => {
    const response = await instance.post("/User/CreateUser", data)
    return response.data
}

export const UpdateUser = async (id, data) => {
    const response = await instance.put('/User/UpdateUser',{
        id,
        ...data,
    })
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

export const AddUserAccess = async ({userId,roleId,enable}) => {
    const response = await instance.post(`/User/AddUserAccess?Enable=${enable}`, {userId, roleId})
    return response.data
}

export const CommentManagment = async(userId,accept) => {
    console.log("userid:", userId)
    console.log("accept:", accept)
    const response = await instance.get("/Course/CommentManagment",{
        params : {
            userId,
            PageNumber : 1,
            RowsOfPage: 50,
            Accept: String(accept),
        }
        
    });
    console.log("response:", response.data)
    return response.data?.comments || [];  
}