import instance from "../../../interseptor/Interseptor"

export const GetBuilding = async() => {
    const response = await instance.get("/Building");
    return response.data
}

export const GetBuildingDetail = async(Id) => {
    const response = await instance.get(`/Building/${Id}`)
    return response.data
}

export const UpdateBuilding = async(id, data) => {
    const response = await instance.put("/Building",{
        id,
        ...data
    })
    return response.data
}

export const CreateBuilding = async(data) => {
    const response = await instance.post('/Building',data)
    return response.data
}

export const ActiveDeactiveBuilding = async(id) => {
    const response = await instance.put('/Building/Active',{id})
    return response.data
}

