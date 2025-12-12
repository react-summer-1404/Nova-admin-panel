import instance from "../../../../interseptor/Interseptor";

export const DeleteCommentApi = async (CourseCommandId) => {
  console.log("Deleting fileId:", CourseCommandId);
  const response = await instance.delete(
    `/Course/DeleteCourseComment?CourseCommandId=${CourseCommandId}`
  );
  return response.data;
};
