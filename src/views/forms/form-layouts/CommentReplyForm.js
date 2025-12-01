// ** Reactstrap Imports
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Input,
  Button,
  Label,
  Row,
} from "reactstrap";

const CommentReplyForm = ({ apiData }) => {
  return (
    <Card>
      <CardBody>
        <Formik initialValues={{ commentTitle: "", describe: "" }}>
          <Form>
          <Row>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='commentTitle'>
                عنوان کامنت
              </Label>
              <Input type='text' name='commentTitle' id='commentTitle' placeholder=' عنوان کامنت را وارد کنید ... ' />
            </Col>
            <Col sm='12' className='mb-1'>
              <Label className='form-label' for='EmailVertical'>
                توضیحات کامنت
              </Label>
              <Input type='text' name='describe' id='describe' placeholder='توضیحات کامنت را وارد کنید ...' />
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  تایید
                </Button>
                <Button outline color='secondary' type='reset'>
                  بازگردانی تغییرات
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
