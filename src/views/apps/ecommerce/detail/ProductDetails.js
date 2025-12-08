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
import {
  editActiveCourse,
  editExpireCourse,
} from "../../../../core/Services/api/EditCourse";
import toast from "react-hot-toast";
import { getStatusList } from "../../../../core/Services/api/StatusSection";
import EditStatus from "./components/EditStatus";
import AddTechnology from "./components/addCategory";
import EditCourse from "./components/EditCourse";

const MySwal = withReactContent(Swal);

const Product = ({ selectedCourse }) => {
  // ** State
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(selectedCourse?.active);
  const [centeredModal, setCenteredModal] = useState(false);
  const [centeredModalTech, setCenteredModalTech] = useState(false);

  // ** Hook
  const {
    setError,
    formState: { errors },
  } = useForm();

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


  const apiParams = {
    id: selectedCourse.id,
    active: !active,
  };

  const editActiveMutation = useMutation({
    mutationFn: (apiParams) => editActiveCourse(apiParams),
    onError: (error) => {
      toast.error("خطایی رخ داد");
      console.log("error=====>", error);
    },
    onSuccess: () => {
      toast.success("عملیات با موفقیت انجام شد");
      setActive(!active);
    },
  });

  const handleCourseAction = () => {
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
        editActiveMutation.mutate(apiParams);

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

                <span>{selectedCourse?.statusName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">ظرفیت:</span>
                <span className="text-capitalize">
                  {selectedCourse?.capacity}
                </span>
              </li>

              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ شروع:</span>
                <span>{selectedCourse?.startTime?.slice(0, 10)}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">تاریخ پایان:</span>
                <span>{selectedCourse?.endTime?.slice(0, 10)}</span>
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
              color={active ? "danger" : "success"}
              onClick={() => handleCourseAction()}
            >
              {active ? "غیرفعال کردن" : "فعال کردن"}
            </Button>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button
              color="secondary"
              onClick={() => setCenteredModalTech(!centeredModalTech)}
            >
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
          <EditStatus
            selectedCourse={selectedCourse}
            setCenteredModal={setCenteredModal}
            centeredModal={centeredModal}
          />
          <AddTechnology
            selectedCourse={selectedCourse}
            setCenteredModal={setCenteredModalTech}
            centeredModal={centeredModalTech}
          />
        </CardBody>
      </Card>
      <EditCourse
        show={show}
        setShow={setShow}
        selectedCourse={selectedCourse}
      />
    </Fragment>
  );
};

export default Product;
