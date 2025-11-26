import instance from "../../../interseptor/Interseptor";
export const getClassist = async () => {
  const response = await instance.get("/ClassRoom");
  return response.data;
};
export const editClassist = async (apiData) => {
  const response = await instance.put("/ClassRoom",apiData);
  return response.data;
};
export const postClassist = async (apiData) => {
  const response = await instance.post("/ClassRoom",apiData);
  return response.data;
};
export const getBuilding = async () => {
  const response = await instance.get("/Building");
  return response.data;
};
