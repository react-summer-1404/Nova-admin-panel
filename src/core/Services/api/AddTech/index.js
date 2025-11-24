import instance from "../../../interseptor/Interseptor";

export const postTech = async (courseId, techList) => {
    const response = await instance.post(
      `/Course/AddCourseTechnology?courseId=${courseId}`,
      techList
    );
    return response.data;
  };
  