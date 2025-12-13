// ** React Imports
import { useState, Fragment, useEffect } from "react";

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
  CardImg,
  CardTitle,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useParams } from "react-router-dom";
import instance from "../../../../core/interseptor/Interseptor";

const MySwal = withReactContent(Swal);

const BlogsDetailInfoCard = () => {
  // ** State
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();

  // ** Get News id
  useEffect(() => {
    instance.get(`/News/${id}`).then((res) => setData(res.data));
  }, [id]);

  const detailItems = data?.detailsNewsDto;
  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
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
              <CardImg
                src={detailItems?.currentImageAddress}
                className="img-fluid"
                top
              />
            </div>
          </div>
          <div className="d-flex justify-content-around my-2">
            <CardTitle tag="h4">
              {console.log("detailItems", detailItems)}
              {detailItems?.title}
            </CardTitle>
          </div>
          <Row>
            <div className="d-flex justify-content-center">
              <Badge color="light-primary" pill>
            {detailItems?.active === true ? (
              <span>فعال</span>
            ) : (
              <span>غیرفعال</span>
            )}
          </Badge>
            </div>
          </Row>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزییات</h4>
          <div className="info-container">
            {detailItems ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نویسنده :</span>
                  <span>{detailItems?.addUserFullName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">دسته بندی :</span>
                  <span>{detailItems?.keyword}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> عنوان گوگل :</span>
                  <span>{detailItems?.googleTitle}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ ایجاد :</span>
                  <span>{detailItems?.insertDate.slice(1, 10)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ بروز رسانی :</span>
                  <span>{detailItems?.updateDate.slice(1, 10)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات کلی :</span>
                  <span>{detailItems?.describe}</span>
                </li>
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default BlogsDetailInfoCard;
