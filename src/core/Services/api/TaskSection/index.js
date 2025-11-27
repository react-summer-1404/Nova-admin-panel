import instance from "../../../interseptor/Interseptor";
export const getTaskList = async () => {
  const response = await instance.get("/AssistanceWork");
  return response.data;
};
export const editTaskList = async (apiData) => {
  const response = await instance.put("/AssistanceWork",apiData);
  return response.data;
};
export const postTaskList = async (apiData) => {
  const response = await instance.post("/AssistanceWork",apiData);
  return response.data;
};
export const getMentorList = async () => {
    const response = await instance.get("/CourseAssistance");
    return response.data;
  };