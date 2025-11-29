// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { Edit } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
  Badge,
} from "reactstrap";

// ** Reactstrap Imports
import {
  Table,
} from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTechList } from "../../../../core/Services/api/TechSection";
import toast from "react-hot-toast";

const CourseReserveList = ({ data, isLoading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
//   const queryClient = useQueryClient();
//   const mutationEditTech = useMutation({
//     mutationFn: editTechList,
//     onSuccess: () => {
//       toast.success("تکنولوژی با موفقیت ویرایش شد");
//       queryClient.invalidateQueries(["getTechList"]);
//     },

//     onError: () => toast.error("خطا در ویرایش تکنولوژی"),
//   });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);

  return (
    <>
     <div className='content-detached content-right'>
        <div className='content-body'>
        <Table hover responsive>
        <thead>
          <tr>
            <th>عکس</th>
            <th>عنوان</th>
            <th>توضیح </th>
            <th>قیمت </th>
            <th>استاد </th>
            <th>وضعیت </th>
            <th>وضعیت انقضا </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className='d-flex justify-content-center'>
              <Spinner color="primary" className='d-flex justify-content-center'/>;

              </td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    className="me-75 rounded"
                    src={item.imageAddress || defaultpPic}
                    height="30"
                    width="30"
                  />
                </td>

                <td className="fw-bold text-black">{item.title}</td>

                <td>
                  <p style={{ color: "#7367f0" }}>{item.miniDescribe}</p>
                </td>
                <td>
                  <p >{item.cost}</p>
                </td>
                <td>
                  <p >{item.fullName}</p>
                </td>
                <td>
                  <p >{item.active?<Badge color="light-success">فعال</Badge>:<Badge color="light-danger">غیر فعال</Badge>}</p>
                </td>
                <td>
                  <p >{item.isExpire?<Badge color="light-danger">منقضی شده</Badge>:<Badge color="light-success">منقضی نشده</Badge>}</p>
                </td>

                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit
                      size={15}
                      className="ms-50"
                      style={{ marginLeft: "6px" }}
                    />
                    ادیت
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
        </div>
     </div>
    </>
  );
};
export default CourseReserveList;
