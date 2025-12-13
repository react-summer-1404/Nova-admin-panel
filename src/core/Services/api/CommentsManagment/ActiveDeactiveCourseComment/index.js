import instance from "../../../../interseptor/Interseptor";

export const AcceptCourseCommentApi = async (CommentCourseId) => {
  const response = await instance.post(
    `/Course/AcceptCourseComment?CommentCourseId=${CommentCourseId}`
  );

  return response.data;
};
