// ** React Imports
import { Fragment } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useQuery } from "@tanstack/react-query";
import { getCreateCourse } from "../../../../../../core/Services/api/CreateCourse";

const schema = yup.object().shape({
 
  CourseLvlId: yup
    .number()
    .required("انتخاب سطح دوره الزامی است")
    .typeError("انتخاب سطح دوره الزامی است"),
  TremId: yup
    .number()
    .required("انتخاب ترم دوره الزامی است")
    .typeError("انتخاب ترم دوره الزامی است"),
    ClassId: yup
    .number()
    .required("انتخاب کلاس دوره الزامی است")
    .typeError("انتخاب کلاس دوره الزامی است"),
  SessionNumber: yup
    .number()
    .typeError("تعداد جلسات باید عدد باشد")
    .positive("عدد باید مثبت باشد")
    .required("ظرفیت الزامی است"),
    TeacherId : yup
    .number()
    .typeError("وارد کردن استاد الزامی است")
    .required("نام استاد الزامی است"),
  // Cost: yup
  //   .number()
  //   .typeError("قیمت باید عدد باشد")
  //   .positive("عدد باید مثبت باشد")
  //   .required("قیمت الزامی است"),
  // StartTime: yup
  //   .date()
  //   .typeError("تاریخ شروع معتبر نیست")
  //   .required("تاریخ شروع الزامی است"),
  // EndTime: yup
  //   .date()
  //   .typeError("تاریخ پایان معتبر نیست")
  //   .required("تاریخ پایان الزامی است")
  //   .min(yup.ref("StartTime"), "تاریخ پایان باید بعد از تاریخ شروع باشد"),
});

const SecondStep = ({ stepper }) => {
  const { data: courseInfo } = useQuery({
    queryKey: ["getSomeInfo"],
    queryFn: getCreateCourse,
  });
  const levelList =
    courseInfo?.courseLevelDtos?.map((level) => ({
      value: level.id,
      label: level.levelName,
    })) || [];

  const courseType =
    courseInfo?.courseTypeDtos?.map((type) => ({
      value: type.id,
      label: type.typeName,
    })) || [];

  const termList =
    courseInfo?.termDtos?.map((term) => ({
      value: term.id,
      label: term.termName,
    })) || [];
  const classRoomList =
    courseInfo?.classRoomDtos?.map((classRoom) => ({
      value: classRoom.id,
      label: classRoom.classRoomName,
    })) || [];
  const TeacherList =
    courseInfo?.teachers?.map((teacher) => ({
      value: teacher.id,
      label: teacher.fullName,
    })) || [];
 

  const defaultValues = {
    CourseLvlId: levelList[0]?.value || "",
    CourseTypeId: courseType[0]?.value || "",
    TremId: TeacherList[0]?.value || "",
    ClassId: classRoomList[0]?.value || "",
    SessionNumber: "",
    UniqeUrlString:"",
    ShortLink:""
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmit = (data) => {
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">مرحله دوم</h5>
        <small>لطفا اطلاعات خواسته شده را وارد نمایید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="CourseTypeId">
              نوع دوره
            </Label>

            <Controller
              name="CourseTypeId"
              control={control}
              defaultValue={courseType[0] || null}
              render={({ field }) => (
                <Select
                  {...field}
                  theme={selectThemeColors}
                  isClearable={false}
                  options={courseType}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(val) => field.onChange(val.value)}
                  value={courseType.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.CourseTypeId && (
              <FormFeedback className="d-block">
                {errors.CourseTypeId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="SessionNumber">
              تعداد جلسات دوره
            </Label>

            <Controller
              name="SessionNumber"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="تعداد جلسات دوره "
                  invalid={errors.SessionNumber && true}
                  {...field}
                />
              )}
            />
            {errors.SessionNumber && (
              <FormFeedback>{errors.SessionNumber.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="CourseLvlId">
              سطح دوره
            </Label>

            <Controller
              name="CourseLvlId"
              control={control}
              defaultValue={levelList[0] || null}
              render={({ field }) => (
                <Select
                  {...field}
                  theme={selectThemeColors}
                  isClearable={false}
                  options={levelList}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(val) => field.onChange(val.value)}
                  value={levelList.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.CourseLvlId && (
              <FormFeedback className="d-block">
                {errors.CourseLvlId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="TremId">
              ترم دوره
            </Label>
            <Controller
              name="TremId"
              control={control}
              defaultValue={termList[0] || null}
              render={({ field }) => (
                <Select
                  {...field}
                  theme={selectThemeColors}
                  isClearable={false}
                  options={termList}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(val) => field.onChange(val.value)}
                  value={termList.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.TremId && (
              <FormFeedback className="d-block">
                {errors.TremId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="ClassId">
              کلاس دوره
            </Label>
            <Controller
              name="ClassId"
              control={control}
              defaultValue={classRoomList[0] || null}
              render={({ field }) => (
                <Select
                  {...field}
                  theme={selectThemeColors}
                  isClearable={false}
                  options={classRoomList}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(val) => field.onChange(val.value)}
                  value={classRoomList.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.ClassId && (
              <FormFeedback className="d-block">
                {errors.ClassId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="TeacherId">
              استاد دوره
            </Label>
            <Controller
              name="TeacherId"
              control={control}
              defaultValue={TeacherList[0] || null}
              render={({ field }) => (
                <Select
                  {...field}
                  theme={selectThemeColors}
                  isClearable={false}
                  options={TeacherList}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(val) => field.onChange(val.value)}
                  value={TeacherList.find(
                    (option) => option.value === field.value
                  )}
                />
              )}
            />
            {errors.TeacherId && (
              <FormFeedback className="d-block">
                {errors.TeacherId.message}
              </FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="UniqeUrlString">
               شناسه دوره
            </Label>

            <Controller
              name="UniqeUrlString"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="شناسه دوره را وارد کنید"
                  invalid={errors.UniqeUrlString && true}
                  {...field}
                />
              )}
            />
            {errors.UniqeUrlString && (
              <FormFeedback>{errors.UniqeUrlString.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="ShortLink">
               لینک دوره
            </Label>

            <Controller
              name="ShortLink"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="لینک کوتاه دوره را وارد کنید"
                  invalid={errors.ShortLink && true}
                  {...field}
                />
              )}
            />
            {errors.ShortLink && (
              <FormFeedback>{errors.ShortLink.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              مرحله قبل
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعد
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SecondStep;
