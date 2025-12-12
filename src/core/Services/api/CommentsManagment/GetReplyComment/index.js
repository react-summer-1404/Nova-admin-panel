
import instance from "../../../../interseptor/Interseptor";

export const GetReplyCommentApi = async (courseId, commentId) => {
  console.log("commentId:", commentId, "courseId:", courseId);
  const response = await instance.get(
    `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`
  );
  return response.data;
};
