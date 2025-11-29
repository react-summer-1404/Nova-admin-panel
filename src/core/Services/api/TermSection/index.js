import instance from "../../../interseptor/Interseptor";
export const getTermList = async () => {
  const response = await instance.get("/Term");
  return response.data;
};
export const getTermDetail = async (id) => {
  const response = await instance.get(`/Term/${id}`);
  return response.data;
};
export const editTermList = async (apiData) => {
  const response = await instance.put("/Term",apiData);
  return response.data;
};
export const postTermList = async (apiData) => {
  const response = await instance.post("/Term",apiData);
  return response.data;
};
export const editTermListTime = async (apiData) => {
  const response = await instance.put("/Term/UpdateTermCloseDate",apiData);
  return response.data;
};
export const postTermListTime = async (apiData) => {
  const response = await instance.post("/Term/AddTermCloseDate",apiData);
  return response.data;
};
