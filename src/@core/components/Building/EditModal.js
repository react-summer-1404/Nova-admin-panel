import { useEffect, useState } from "react";
import { useUpdateBuilding } from "../../../core/Hook/useMUserApi";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const activeOptions = [
    { value: true, label: 'فعال' },
    { value: false, label: 'غیرفعال' },
  ]


const EditModal = ({isOpen, toggle, data}) => {
    const queryClient = useQueryClient();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({ defaultValues : {
        buildingName: "",
        floor: 0,
        latitude: "",
        longitude: "",
        active: false,
    }, mode: "onChange" });

    useEffect(() => {
        if (data) {
            reset({
                buildingName : data.buildingName || "",
                floor : Number(data.floor) ,
                latitude : data.latitude || "",
                longitude : data.longitude || "",
                active : Boolean(data.active) || false,
            });
        }
    },[data, reset]);

    const { mutate: updateBuilding } = useUpdateBuilding({
        onSuccess: (_, variables) => {       
        queryClient.setQueryData(["BuildingList"], (old) => 
            old.map((b) => (b.id === variables.id ? {...b, ...variables} : b))
        );
        toast.success("ویرایش انجام شد");
        toggle();
    },
        onError: (error) => {
        toast.error(error?.response?.data?.message || " خطا در ویرایش ساختمان");
        },
    });

    // ** Function to handle form submit
    const onSubmit = (formdata) => {
        const finalData = {
        ...formdata,
        id : data?.id,
        floor : Number(formdata.floor),
        active : formdata.active === true
    };
        console.log("ایدی ساختمان", data?.id);
        console.log("sending :", finalData);
        updateBuilding(finalData);
        toggle();
    };

    return(
        <Modal
            isOpen={isOpen} toggle={toggle}
            className="modal-dialog-centered modal-md"
            >
            <ModalHeader
                className="bg-transparent"
                toggle={toggle}
            ></ModalHeader>
            <ModalBody className="px-sm-5 pt-50 pb-5">
                <div className="text-center mb-2">
                <h1 className="mb-1">ویرایش ساختمان </h1>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-1 pt-75">
                    <Col md={12} xs={12}>
                    <Label className="form-label" for="buildingName">
                        نام ساختمان
                    </Label>
                    <Controller
                        control={control}
                        name="buildingName"
                        rules={{ required: "نام ساختمان الزامی است" }}
                        render={({ field }) => (
                        <>
                            <Input
                            {...field}
                            placeholder="نام ساختمان را وارد کنید"
                            />
                            {errors.buildingName && (
                            <span>{errors.buildingName.message}</span>
                            )}
                        </>
                        )}
                    />
                    </Col>
                    <Col md={12} xs={12}>
                    <Label className="form-label" for="floor">
                        طبقه
                    </Label>
                    <Controller
                        control={control}
                        name="floor"
                        rules={{ required: "طبقه الزامی است" }}
                        render={({ field }) => (
                        <>
                            <Input
                            {...field}
                            placeholder="طبقه را وارد کنید"
                            />
                            {errors.floor && <span>{errors.floor.message}</span>}
                        </>
                        )}
                    />
                    </Col>
                    <Col md={12} xs={12}>
                    <Label className="form-label" for="latitude">
                        عرض جغرافیایی
                    </Label>
                    <Controller
                        control={control}
                        name="latitude"
                        rules={{ required: "عرض جغرافیایی الزامی است" }}
                        render={({ field }) => (
                        <>
                            <Input
                            {...field}
                            placeholder="عرض جغرافیایی را وارد کنید"
                            />
                            {errors.latitude && (
                            <span>{errors.latitude.message}</span>
                            )}
                        </>
                        )}
                    />
                    </Col>
                    <Col md={12} xs={12}>
                    <Label className="form-label" for="longitude">
                        طول جغرافیایی
                    </Label>
                    <Controller
                        control={control}
                        name="longitude"
                        rules={{ required: "طول جغرافیایی الزامی است" }}
                        render={({ field }) => (
                        <>
                            <Input
                            {...field}
                            placeholder=" طول جغرافیایی را وارد کنید"
                            />
                            {errors.longitude && (
                            <span>{errors.longitude.message}</span>
                            )}
                        </>
                        )}
                    />
                    </Col>
                    <Col md={12} xs={12}>
                        <Label className='form-label' for='active'>
                            وضعیت:
                        </Label>
                        <Controller
                            name='active'
                            control={control}
                            render={({field}) => (
                            <select {...field} className='form-control' onChange={(e) => field.onChange(e.target.value === "true")}>
                                {activeOptions.map((opt) => (
                                <option key={opt.value.toString()} value={opt.value.toString()}>
                                    {opt.label}
                                </option>
                                ))}                                    
                            </select>
                            )}
                        />
                    </Col>
                    <Col xs={12} className="text-center mt-2 pt-50">
                    <Button
                        type="submit"
                        className="me-1"
                        color="primary"
                    >
                        تایید و ارسال
                    </Button>
                    <Button
                        type="submit"
                        color="secondary"
                        outline
                        onClick={() => {reset();
                            {toggle}
                        }}
                    >
                        صرف نظر کردن
                    </Button>
                    </Col>
                </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
};

export default EditModal
