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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCreateCourse } from "../../../../../../core/Services/api/CreateCourse";
import { postTech } from "../../../../../../core/Services/api/AddTech";
import toast from "react-hot-toast";

const FifthStep = ({ stepper, courseId }) => {
  const { data: courseInfo } = useQuery({
    queryKey: ["getSomeInfo"],
    queryFn: getCreateCourse,
  });
  const technologyList =
    courseInfo?.technologyDtos?.map((tech) => ({
      value: tech.id,
      label: tech.techName,
    })) || [];

  const defaultValues = {
    techId: technologyList[0]?.value || "",
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues,
  });

  
  const mutationTech = useMutation({
    
    mutationFn: ({ courseId, techIds }) => postTech(courseId, techIds),
    onSuccess: () => {
      toast.success("تکنولوژی مورد نظر با موفقیت افزوده شد");
    },
    onError: () => {
      toast.error("خطایی رخ داد");
    },
  });

  const onSubmit = (data) => {
    const formatted = data.techId.map((id) => ({ techId: id }));

    mutationTech.mutate({ courseId, techIds: formatted });

    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">تکنولوژی دوره</h5>
        <small>لطفا تکنولوژی مورد نظر خود را انتخاب کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="techId">
              شما تنها  مجاز به انتخاب دو تکنولوژی هستید
            </Label>

            <Controller
              name="techId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  theme={selectThemeColors}
                  isClearable={false}
                  isMulti={true}
                  options={technologyList}
                  onChange={(val) => field.onChange(val.map((v) => v.value))}
                  value={technologyList.filter((option) =>
                    field.value.includes(option.value)
                  )}
                />
              )}
            />

            {errors.techId && (
              <FormFeedback className="d-block">
                {errors.techId.message}
              </FormFeedback>
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
          <Button type="submit" color="success" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              افزودن
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default FifthStep;
