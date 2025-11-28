
import instance from "../../../interseptor/Interseptor"

export const GetBuilding = async() => {
    const response = await instance.get("/Building");
    return response.data
}

export const GetBuildingDetail = async(Id) => {
    const response = await instance.get(`/Building/${Id}`)
    return response.data
}

export const UpdateBuilding = async(data) => {
    const response = await instance.put("/Building",data)
    return response.data
}

export const CreateBuilding = async(data) => {
    const response = await instance.post('/Building',data)
    console.log("response form server :", response.data)
    return response.data
}

export const ActiveDeactiveBuilding = async({id,active}) => {
    const response = await instance.put('/Building/Active',{id, active})
    return response.data
}

