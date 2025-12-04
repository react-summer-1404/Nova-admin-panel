import instance from "../../../interseptor/Interseptor";
export const getAdminSchedules = async (apiParams) => {
  const response = await instance.get("/Schedual/GetAdminScheduals", {
    params: apiParams,
  });
  return response.data;
};
export const getStudentSchedules = async (apiParams) => {
  const response = await instance.get("/Schedual/GetStudentScheduals", {
    params: apiParams,
  });
  return response.data;
};
export const getStudentSchedulesDetail = async (SchedualId) => {
  const response = await instance.get(`/Schedual/GetStudentScheduals/${SchedualId}`);
  return response.data;
};

export const AddSchedualSingle = async (currentCurseId, apiData) => {
  const response = await instance.post(
    "/Schedual/AddSchedualSingle/",
    apiData,
    {
      params: { currentCurseId }
    }
  );
  return response.data;
};
export const AddSchedualSingle = async (currentCurseId, apiData) => {
  const response = await instance.post(
    "/Schedual/AddSchedualSingle/",
    apiData,
    {
      params: { currentCurseId }
    }
  );
  return response.data;
};
export const EditSchedualSingle = async ( apiData) => {
  const response = await instance.put(
    "/Schedual/LockToRiase",
    apiData,
    
  );
  return response.data;
};
