// ** Custom Components
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import Avatar from "@components/avatar";

import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { MoreVertical, Edit, Trash } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editStatusList } from "../../../../core/Services/api/StatusSection";
import defaultPic from "../../../../assets/images/defalt.png";
import { postReserveAccept } from "../../../../core/Services/api/acceptReserve";
const GroupTable = ({
  data,
  isLoading,
  setCenteredModal,
  centeredModal,
  courseId,
  studentId
}) => {
//   const [selectedId, setSelectedId] = useState(null);
  const handleSelect = (id) => {
    mutationReserve.mutate({
      courseId,
      courseGroupId: id,
      studentId
    });
    setCenteredModal(false);
  };
  
// console.log(selectedId)
 const queryClient = useQueryClient()
  const mutationReserve = useMutation({
    mutationFn: (apiData) => postReserveAccept(apiData),
    onError: (error) => {
      toast.error("خطایی رخ داد");
      console.log("error", error);
    },
    onSuccess: () =>{ toast.success("رزرو تایید شد")
    queryClient.invalidateQueries(["courseStudentReserve"])
},
  });
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عکس</th>
            <th>عنوان</th>
            <th>ظرفیت گروه</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <Spinner color="primary" />
              </td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr key={item.id}>
                <td className="fw-bold text-black">
                  <Avatar img={item.iconAddress || defaultPic} />
                </td>

                <td className="fw-bold text-black">{item.groupName}</td>
                <td className="fw-bold text-black">{item.groupCapacity}</td>

                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleSelect(item.id)}
                  >
                    انتخاب
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default GroupTable;
