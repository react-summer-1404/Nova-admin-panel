import instance from "../../../interseptor/Interseptor";
export const getSessionDetails = async (apiParams) => {
  const response = await instance.get("/Session/SessionDetail", {
    params: apiParams,
  });
  return response.data;
};
export const getSessionHomeWorks = async (apiParams) => {
  const response = await instance.get("/Session/GetSessionHomeWork", {
    params: apiParams,
  });
  return response.data;
};
