import instance from "../../../interseptor/Interseptor";
export const getTechList = async () => {
  const response = await instance.get("/Technology");
  return response.data;
};
export const editTechList = async (apiData) => {
  const response = await instance.put("/Technology",apiData);
  return response.data;
};
