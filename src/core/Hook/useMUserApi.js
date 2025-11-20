import { useMutation } from "@tanstack/react-query";
import { AddUserAccess, CreateUser, DeleteUser, ReverseToActiveUser, UpdateUser } from "../Services/api/GetUserList";

export const UseCreateUser = (onSuccess) => 
    useMutation({
        mutationFn : async (data) => await CreateUser(data),
        onSuccess
    })

export const UseUpdateUser = (onSuccess) => 
    useMutation({
        mutationFn : async (data) => await UpdateUser(data),
        onSuccess
    })

export const UseDeleteUser = (onSuccess) => 
    useMutation({
        mutationFn : async (id) => {
            const response = await DeleteUser(id)
            console.log("delete user response ==>", response)
        },
        
    })

export const UseReverseToActiveUser = (onSuccess) =>
    useMutation({
        mutationFn : async (id) => await ReverseToActiveUser(id),
        onSuccess
    })

export const UseAddUserAccess = (onSuccess) => 
    useMutation({
        mutationFn: async (data) => await AddUserAccess(data),
        onSuccess
    })