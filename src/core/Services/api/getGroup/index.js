import instance from "../../../interseptor/Interseptor";

export const getGroupList = async (apiParams) => {
  const response = await instance.get("/CourseGroup", {
    params: apiParams,
  });
  return response.data;
};
export const createGroup = async (formData) => {
  const response = await instance.post("/CourseGroup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const editGroup = async (formData) => {
  const response = await instance.put("/CourseGroup", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
export const deleteGroup = async (formData) => {
  const response = await instance.delete("/CourseGroup", {
    data: formData
  });
  return response.data;
};

