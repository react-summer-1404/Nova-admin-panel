// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
// import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { MoreVertical, Edit, CheckCircle , Search } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  InputGroup,
  Input,
  InputGroupText,
} from "reactstrap";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GetAllUserReserveList, GetStudentReserveList } from "../../../../core/Services/api/GetUserList";
import { postReserveAccept } from "../../../../core/Services/api/acceptReserve";
import { useDebounce } from "use-debounce";
import { getGroupList } from "../../../../core/Services/api/getGroup";
import GroupTable from "../groupTable";

const TableServerSide = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [centeredModal, setCenteredModal] = useState(false);
  const [searchGroup, setSearchGroup] = useState("");
  const [debounceGroup] = useDebounce(searchGroup, 500);

  const apiParams = {
    PageNumber: 1,
    RowsOfPage: 1000,
    Query: debounceGroup,
  };
//   const userApiParams = {
//     PageNumber: 1,
//     RowsOfPage: 1000,
//     CourseId: selectedId,
//     Query: debounceUser,
//   };
  const { data: Groups, isLoading } = useQuery({
    queryFn: () => getGroupList(apiParams),
    queryKey: ["GetGroupList", apiParams],
    refetchOnWindowFocus: false,
  });

  const current = Groups?.courseGroupDtos;


  const courseId = useSelector(state => state.ecommerce.productDetail.id)

  const {data:reserve}=useQuery({
    queryKey:["courseStudentReserve"],
    queryFn:GetAllUserReserveList,
    enabled: !!courseId
  })
  const filteredUser = reserve?.filter((item)=>item.courseId == courseId)
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setCenteredModal(!centeredModal)
  };
  const handleCloseModal = () => setSelectedItem(null);
console.log("reserve",filteredUser)
console.log("selectedItem",selectedItem)
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
          <th>نام داشنجو</th>
            <th>نام دوره</th>
            <th>وضعیت </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
       
          {  filteredUser?.map((item) => (
              <tr key={item.id}>
  

                <td className="fw-bold text-black">{item.studentName}</td>
                <td className="fw-bold text-black">{item.courseName}</td>
                <td className="fw-bold text-black">{item.accept?<Badge color="light-success">تایید شده</Badge>:<Badge color="light-danger"> تایید نشده</Badge>}</td>
                <td>
                
                   <UncontrolledDropdown>
                      <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                      >
                        <MoreVertical size={15} />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => handleEditClick(item)}>
                          <CheckCircle  className="me-50" size={15} />{" "}
                          <span className="align-middle">تایید</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditTimeClick(item)}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">ادیت زمان</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
              </tr>
            ))}
        
        </tbody>
      </Table>

      {/* Modal */}
      <Modal
           isOpen={selectedItem ? true : false}
            toggle={() => setCenteredModal(!centeredModal)}
            className="modal-dialog-centered"
          >
            <ModalHeader
              toggle={handleCloseModal}
            ></ModalHeader>

            <ModalBody>
              <InputGroup className="input-group-merge">
                <Input
                  className="search-product"
                  placeholder="جستجو دوره..."
                  onChange={(e) => setSearchGroup(e.target.value)}
                  value={searchGroup}
                />
                <InputGroupText>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
              </InputGroup>
              <GroupTable
                data={current}
                isLoading={isLoading}
                centeredModal={centeredModal}
                setCenteredModal={setCenteredModal}
                courseId={courseId}
                studentId ={selectedItem?.studentId}
              />
            </ModalBody>
          </Modal>
    </>
  );
};
export default TableServerSide;
