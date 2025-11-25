import instance from "../../../interseptor/Interseptor";
export const getStatusList = async () => {
  const response = await instance.get("/Status");
  return response.data;
};
export const editStatusList = async (apiData) => {
  const response = await instance.put("/Status",apiData);
  return response.data;
};
export const postStatusList = async (apiData) => {
  const response = await instance.post("/Status",apiData);
  return response.data;
};
