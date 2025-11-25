import { useMutation } from "@tanstack/react-query";
import { AddUserAccess, CreateUser, DeleteUser, ReverseToActiveUser, UpdateUser } from "../Services/api/GetUserList";
import toast from "react-hot-toast";
import { error } from "jquery";

export const UseCreateUser = ({onSuccess, onError}) => 
    useMutation({
        mutationFn : async (data) => await CreateUser(data),
        onSuccess,
        onError
    })

export const UseUpdateUser = ({onSuccess,onError}) => {
    return useMutation({
        mutationFn : ({id,data}) => UpdateUser(id,data),
        onSuccess,
        onError
    });
    };
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