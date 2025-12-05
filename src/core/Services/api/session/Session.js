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
export const addMainHomework = async (apiData) => {
  const response = await instance.post("/Session/AddSessionHomeWork",apiData);
  return response.data;
};
export const addSessionFile = async (formData) => {
  const response = await instance.post("/Session/AddSessionFile",formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const addSessionFileWithUrl = async (apiParams) => {
  console.log("sending params:", apiParams);

  const response = await instance.post(
    "/Session/AddSessionFileWithUrl",
    {},   
    {
      params: {
        SessionId: apiParams.SessionId,
        Url: apiParams.Url,
      },
    }
  );

  return response.data;
};
