// import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
} from "reactstrap";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "recharts";
import toast from "react-hot-toast";
import { postTech } from "../../../../../core/Services/api/AddTech";
import { useForm, Controller } from "react-hook-form";
import { getCreateCourse } from "../../../../../core/Services/api/CreateCourse";
import "@styles/react/libs/react-select/_react-select.scss";
import Select from "react-select";
import { selectThemeColors } from "@utils";

const AddTechnology = ({ selectedCourse, centeredModal, setCenteredModal }) => {
  const { data: courseInfo } = useQuery({
    queryKey: ["getSomeInfoDetail"],
    queryFn: getCreateCourse,
  });
  const technologyList =
    courseInfo?.technologyDtos?.map((tech) => ({
      value: tech.id,
      label: tech.techName,
    })) || [];
  const courseId = selectedCourse.id;
  const defaultValues = {
    techId: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues,
  });
  const addTechProductMutation = useMutation({
    mutationFn: ({ courseId, techIds }) => postTech(courseId, techIds),
    onError: (error) => {
      console.log("error", error);
      toast.error("خطایی رخ داد");
    },
    onSuccess: () => {
      toast.success("با موفقیت اضافه شد");
      setCenteredModal(!centeredModal);
    },
  });
  const onSubmit = (data) => {
    const formatted = data.techId.map((id) => ({ techId: id }));

    addTechProductMutation.mutate({ courseId, techIds: formatted });
  };

  return (
    <div>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
          افزودن کتگوری
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label className="form-label" for="techId">
              انتخاب کنید
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
            <ModalFooter>
              <Button color="primary" type="submit">
                ذخیره
              </Button>
              <Button
                color="secondary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                بستن
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddTechnology;
