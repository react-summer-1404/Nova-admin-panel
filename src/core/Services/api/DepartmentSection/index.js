import instance from "../../../interseptor/Interseptor";
export const getDepartmentList = async () => {
  const response = await instance.get("/Department");
  return response.data;
};
export const editDepartmentList = async (apiData) => {
  const response = await instance.put("/Department",apiData);
  return response.data;
};
export const postDepartmentList = async (apiData) => {
  const response = await instance.post("/Department",apiData);
  return response.data;
};
