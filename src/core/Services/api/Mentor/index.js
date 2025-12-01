import instance from "../../../interseptor/Interseptor";
export const createMentor = async (apiData) => {
    const response = await instance.post("/CourseAssistance", apiData);
    return response.data;
  };
  export const editMentor = async (apiData) => {
    const response = await instance.put("/CourseAssistance", apiData);
    return response.data;
  }
  export const getMentorDetail = async (id) => {
    const response = await instance.get(`/CourseAssistance/${id}`);
    return response.data;
  }