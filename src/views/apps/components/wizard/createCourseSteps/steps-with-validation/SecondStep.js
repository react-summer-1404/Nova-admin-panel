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
  // CourseLvlId: yup
    // .required("انتخاب سطح دوره الزامی است")
    // .typeError("انتخاب سطح دوره الزامی است"),
  // TremId: yup
    // .required("انتخاب ترم دوره الزامی است")
    // .typeError("انتخاب ترم دوره الزامی است"),
  // ClassId: yup
    // .required("انتخاب کلاس دوره الزامی است")
    // .typeError("انتخاب کلاس دوره الزامی است"),
  SessionNumber: yup
  .number()
    .typeError("تعداد جلسات باید عدد باشد")
    .positive("عدد باید مثبت باشد")
    .required("ظرفیت الزامی است"),
  // TeacherId: yup
    // .typeError("وارد کردن استاد الزامی است")
    // .required("نام استاد الزامی است"),
});

const SecondStep = ({ stepper, updateStepData }) => {
  const { data: courseInfo } = useQuery({
    queryKey: ["getSomeInfo"],
    queryFn: getCreateCourse,
  });
  console.log("courses info ====>",courseInfo)
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
      value: teacher.teacherId,
      label: teacher.fullName,
    })) || [];

  const defaultValues = {
    CourseLvlId: levelList[0]?.value || "",
    CourseTypeId: courseType[0]?.value || "",
    TremId: termList[0]?.value || "",
    TeacherId: TeacherList[0]?.value || "",
    ClassId: classRoomList[0]?.value || "",
    SessionNumber: "",
    UniqeUrlString: "",
    ShortLink: "",
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
    updateStepData("step2", data);
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
              <span>نوع دوره (درحال حاض در دسترس نیست)</span>
            </Label>

            <Controller
              name="CourseTypeId"
              control={control}
              render={({ field }) => (
                <Select
                isDisabled={true}
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
            {/* {errors.CourseTypeId && (
              <FormFeedback className="d-block">
                {errors.CourseTypeId.message}
              </FormFeedback>
            )} */}
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
            {/* {errors.CourseLvlId && (
              <FormFeedback className="d-block">
                {errors.CourseLvlId.message}
              </FormFeedback>
            )} */}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="TremId">
              ترم دوره
            </Label>
            <Controller
              name="TremId"
              control={control}
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
            {/* {errors.TremId && (
              <FormFeedback className="d-block">
                {errors.TremId.message}
              </FormFeedback>
            )} */}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="ClassId">
              کلاس دوره
            </Label>
            <Controller
              name="ClassId"
              control={control}
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
            {/* {errors.ClassId && (
              <FormFeedback className="d-block">
                {errors.ClassId.message}
              </FormFeedback>
            )} */}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="TeacherId">
              استاد دوره
            </Label>
            <Controller
              name="TeacherId"
              control={control}
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
            {/* {errors.TeacherId && (
              <FormFeedback className="d-block">
                {errors.TeacherId.message}
              </FormFeedback>
            )} */}
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
               قبلی
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
               بعدی
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
