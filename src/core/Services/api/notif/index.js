import instance from "../../../interseptor/Interseptor";
export const addNotifForUser = async (apiData) => {
  const response = await instance.post("/v2/notification/alert/add",apiData);
  return response.data;
};