import { GetBuilding, GetBuildingDetail } from "../Services/api/Building";
import { GetUserDetail, GetUserList } from "../Services/api/GetUserList";
import { useQuery } from "@tanstack/react-query";

export const useUserList = (apiParams) =>
    useQuery({
        queryKey: ["userList", apiParams],
        queryFn: () => GetUserList(apiParams),
    });

export const useUserDetails = (UserId) =>
    useQuery({
        queryKey: ["UserDetail", UserId],
        queryFn: () => GetUserDetail(UserId),
        enabled: !!UserId,
    });

export const useBuildingList = () =>
    useQuery({
        queryKey : ["BuildingList"],
        queryFn : GetBuilding,
    });

export const useBuildingDetail = (Id) => 
    useQuery({
        queryKey : ["BuildingDetail", Id],
        queryFn : () => GetBuildingDetail(Id),
        enabled : !!Id,
    })
