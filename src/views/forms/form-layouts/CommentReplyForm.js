// ** Reactstrap Imports
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Card,
  CardBody,
  Col,
  Input,
  Button,
  Label,
  Row,
} from "reactstrap";
import { AddReplyCourseCommentApi } from "../../../core/Services/api/CommentsManagment/AddReplyCourseComment";
import toast from "react-hot-toast";

const CommentReplyForm = ({
  apiData,
  setShowReplyModal,
  CommentId,
  CourseId,
}) => {

  const { mutateAsync: postCourseCommentReply } = useMutation({
    mutationFn: AddReplyCourseCommentApi,
    onSuccess: () => {
      toast.success("پاسخ با موفقیت اضافه شد ");
    },
    onError: () => {
      toast.error("پاسخ ثبت نشد");
    }
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("CommentId",CommentId);
    formData.append("CourseId",CourseId);
    formData.append("Title", values.Title);
    formData.append("Describe", values.Describe);

    await postCourseCommentReply(formData);
  };
  return (
    <Card>
      <CardBody>
        <Formik
          initialValues={{ Title: "", Describe: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="Title">
                  عنوان کامنت
                </Label>
                <Input
                  type="text"
                  name="Title"
                  id="Title"
                  placeholder=" عنوان کامنت را وارد کنید ... "
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="EmailVertical">
                  توضیحات کامنت
                </Label>
                <Input
                  type="text"
                  name="Describe"
                  id="Describe"
                  placeholder="توضیحات کامنت را وارد کنید ..."
                />
              </Col>
              <Col sm="12">
                <div className="d-flex">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                  >
                    تایید
                  </Button>
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    onClick={() => setShowReplyModal(false)}
                  >
                    بستن
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};
export default CommentReplyForm;
