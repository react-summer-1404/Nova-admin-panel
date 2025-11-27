// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, MessageSquare, X, Book } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import defaultPic from "../../../../assets/images/defalt.png";
// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editActiveCourse, editExpireCourse } from "../../../../core/Services/api/EditCourse";
import toast from "react-hot-toast";
import { getStatusList } from "../../../../core/Services/api/StatusSection";
import EditStatus from "./components/EditStatus";

const MySwal = withReactContent(Swal);

const Product = ({ selectedCourse }) => {
  // ** State
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(selectedCourse?.active);
  const [centeredModal, setCenteredModal] = useState(false);


  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: selectedCourse.username,
      // lastName: selectedCourse.fullName.split(' ')[1],
      // title: selectedCourse?.title || ""
    },
  });

  // ** render user img

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      // username: selectedCourse.username,
      // lastName: selectedCourse.fullName.split(' ')[1],
      // title: selectedCourse?.title || ""
    });
  };
  const apiParams={
    id:selectedCourse.id,
    active:!active
  }

  const editActiveMutation = useMutation({
    mutationFn:(apiParams)=>editActiveCourse(apiParams),
    onError:(error)=>{
      toast.error("خطایی رخ داد")
      console.log("error=====>",error)
    },
    onSuccess:()=>{

    toast.success("عملیات با موفقیت انجام شد")
    setActive(!active);

    }
    
  })
 

  const handleCourseAction  = () => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "با این کار، دوره غیرفعال خواهد شد.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله!",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        editActiveMutation.mutate(apiParams) 
        
        MySwal.fire({
          icon: "success",
          title: "تغییرات با موفقیت اعمال شد!",
          text: "وضعیت دوره مورد نظر تغییر کرد.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: "وضعیت دوره بدون تغییر باقی ماند.",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <img
                height="90%"
                width="90%"
                alt="user-avatar"
                src={selectedCourse?.image || defaultPic}
                className="img-fluid rounded mt-3 mb-2"
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{selectedCourse?.title}</h4>
                  {active ? (
                    <Badge color="success">فعال</Badge>
                  ) : (
                    <Badge color="danger">غیرفعال</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Book className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCourse.reserveUserTotal}</h4>
                <small>تعداد رزرو شده ها</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCourse.courseCommentTotal}</h4>
                <small>تعداد کامنت ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات دوره</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">نام استاد:</span>
                <span>{selectedCourse?.teacherName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">قیمت :</span>
                <span>{selectedCourse?.price}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">وضعیت:</span>
                {/* <Badge className='text-capitalize' color={statusColors[selectedCourse.status]}>
                    {selectedCourse.statusName}
                  </Badge> */}

                <span>{selectedCourse?.statusName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">ظرفیت:</span>
                <span className="text-capitalize">
                  {selectedCourse?.capacity}
                </span>
              </li>
              {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Tax ID:</span>
                  <span>Tax-{selectedCourse.contact.substr(selectedCourse.contact.length - 4)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contact:</span>
                  <span>{selectedCourse.contact}</span>
                </li> */}
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ شروع:</span>
                <span>{selectedCourse?.startTime?.slice(0,10)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ پایان:</span>
                <span>{selectedCourse?.endTime?.slice(0,10)}</span>
              </li>
            </ul>
            <div className="mb-75">
              <span className="fw-bolder me-25"> توضیحات:</span>
              <p>{selectedCourse.describe}</p>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ادیت
            </Button>
            <Button 
              className="ms-1"
              color={active?"danger":"success"}
              onClick={()=>handleCourseAction() }
            >
             {active?"غیرفعال کردن":"فعال کردن"}
            </Button>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button  color="secondary" onClick={() => setShow(true)}>
              افزودن کتگوری
            </Button>
            <Button
              className="ms-1"
              color="warning"
              onClick={() => setCenteredModal(!centeredModal)}

            >
               تغییر وضعیت
            </Button>
          </div>
          <EditStatus selectedCourse={selectedCourse} setCenteredModal={setCenteredModal} centeredModal={centeredModal}/>

        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Last Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="username"
                  name="username"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="john.doe.007"
                      invalid={errors.username && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Billing Email
                </Label>
                <Input
                  type="email"
                  id="billing-email"
                  defaultValue={selectedCourse.email}
                  placeholder="example@domain.com"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Status:
                </Label>
                {/* <Select
                  id='status'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={statusOptions}
                  theme={selectThemeColors}
                  defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedCourse.status)]}
                /> */}
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="tax-id">
                  Tax ID
                </Label>
                <Input
                  id="tax-id"
                  placeholder="Tax-1234"
                  // defaultValue={selectedCourse.contact.substr(selectedCourse.contact.length - 4)}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="contact">
                  Contact
                </Label>
                <Input
                  id="contact"
                  defaultValue={selectedCourse.contact}
                  placeholder="+1 609 933 4422"
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="language">
                  language
                </Label>
                {/* <Select
                  id='language'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={languageOptions}
                  theme={selectThemeColors}
                  defaultValue={languageOptions[0]}
                /> */}
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                {/* <Select
                  id='country'
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                /> */}
              </Col>
              <Col xs={12}>
                <div className="d-flex align-items-center mt-1">
                  <div className="form-switch">
                    <Input
                      type="switch"
                      defaultChecked
                      id="billing-switch"
                      name="billing-switch"
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="billing-switch"
                    >
                      <span className="switch-icon-left">
                        <Check size={14} />
                      </span>
                      <span className="switch-icon-right">
                        <X size={14} />
                      </span>
                    </Label>
                  </div>
                  <Label
                    className="form-check-label fw-bolder"
                    for="billing-switch"
                  >
                    Use as a billing address?
                  </Label>
                </div>
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Product;
