import { useState } from "react"
import { GetUserDetail, GetUserList } from "../Services/api/GetUserList"
import { useQuery } from "@tanstack/react-query"


export const useUserList = (apiParams) => 
    useQuery({
    queryKey : ["userList", apiParams],
    queryFn: () => GetUserList(apiParams)
})

export const useUserDetails = (UserId) => 
    useQuery({
        queryKey:["UserDetail", UserId],
        queryFn: () => GetUserDetail(UserId),
        enabled : !!UserId
        
    })
    
