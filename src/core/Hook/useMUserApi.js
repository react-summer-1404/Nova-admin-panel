import { useMutation } from "@tanstack/react-query";
import {
    AddUserAccess,
    CreateUser,
    DeleteUser,
    ReverseToActiveUser,
    UpdateUser,
} from "../Services/api/GetUserList";
import { CreateBuilding, UpdateBuilding } from "../Services/api/Building";
import { data } from "jquery";


export const useCreateUser = ({ onSuccess, onError }) =>
    useMutation({
        mutationFn: async (data) => await CreateUser(data),
        onSuccess,
        onError,
    });

export const useUpdateUser = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: ({ id, data }) => UpdateUser(id, data),
        onSuccess,
        onError,
    });
};
export const useDeleteUser = (onSuccess) =>
    useMutation({
        mutationFn: async (id) => {
        const response = await DeleteUser(id);
        console.log("delete user response ==>", response);
        },
    });

export const useReverseToActiveUser = (onSuccess) =>
    useMutation({
        mutationFn: async (id) => await ReverseToActiveUser(id),
        onSuccess,
    });

export const useAddUserAccess = (onSuccess) =>
    useMutation({
        mutationFn: async (data) => await AddUserAccess(data),
        onSuccess,
    });

export const useUpdateBuilding = (onSuccess) => 
    useMutation({
        mutationFn : async ({id, data}) => UpdateBuilding(id, data),
        onSuccess,
        onError,
    });

export const useCreateBuilding = (onSuccess, onError)  => 
    useMutation({
        mutationFn : async (data) => await CreateBuilding(data),
        onSuccess,
        onError,
    });

export const useActiveDeactiveBuilding = (onSuccess) => 
    useMutation({
        mutationFn : async (data) => await ActiveDeactiveBuilding(data),
        onSuccess,
    })
