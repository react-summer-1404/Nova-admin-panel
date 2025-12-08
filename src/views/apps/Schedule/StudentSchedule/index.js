import React, { useEffect, useState } from "react";
import TableUserList from "../../tables/CourseUserListTable/TableUserList";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Search } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useUserList } from "../../../../core/Hook/useQUserApi";
import { getStudentSchedules } from "../../../../core/Services/api/Schedule";
import UserModelTable from "../../tables/scheduleUserModalTable/UserModalTable";
import ScheduleUserListTable from "../../tables/scheduleUserListTable/scheduleUserListTable";

function ScheduleUserList() {
  const [centeredModal, setCenteredModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [debounceProduct] = useDebounce(searchProduct, 500);
  const [searchUser, setSearchUser] = useState("");
  const [debounceUser] = useDebounce(searchUser, 500);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const apiParams = {
    PageNumber: perPage,
    RowsOfPage: currentPage,
    Query: debounceProduct,
  };
  const userApiParams = {
    
    StudentId: selectedId,
    
  };
  const { data: users, isLoading } = useQuery({
    queryFn: () => getStudentSchedules(userApiParams),
    queryKey: ["UserSchedules", userApiParams],
  });

  const { data: userList, isLoading: loading } = useUserList(apiParams)
  const current = userList?.listUser;

  // const handlePerPage = (e) => {
  //   setPerPage(parseInt(e.target.value));
  //   setCurrentPage(1);
  // };

  // const handlePagination = (perPage) => {
  //   setCurrentPage(perPage);
  // };

  // const CustomPagination = () => {
  //   const count = Number((data?.length / perPage).toFixed(0));

  //   return (
  //     <ReactPaginate
  //       nextLabel=""
  //       breakLabel="..."
  //       previousLabel=""
  //       pageCount={count || 1}
  //       activeClassName="active"
  //       breakClassName="page-item"
  //       pageClassName={"page-item"}
  //       breakLinkClassName="page-link"
  //       nextLinkClassName={"page-link"}
  //       pageLinkClassName={"page-link"}
  //       nextClassName={"page-item next"}
  //       previousLinkClassName={"page-link"}
  //       previousClassName={"page-item prev"}
  //       onPageChange={(page) => handlePagination(page.selected + 1)}
  //       forcePage={currentPage !== 0 ? currentPage - 1 : 0}
  //       containerClassName={"pagination react-paginate justify-content-end p-1"}
  //     />
  //   );
  // };

  // const dataToRender = () => {
  //   if (!current || current.length ===0) return [];
  //   const filtered = current?.filter((b) =>
  //     b?.fName?.toLowerCase().includes(value.toLowerCase())
  //   );
  //   return filtered?.slice((currentPage - 1) * perPage, currentPage * perPage);
  // };

  return (
    <div>
      <Row className="d-flex justify-content-between align-items-center">
        <Col xl="3" md="4" sm="6">
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => setCenteredModal(!centeredModal)}
          >
            انتخاب کاربر
          </Button>
          <Modal
            isOpen={centeredModal}
            toggle={() => setCenteredModal(!centeredModal)}
            className="modal-dialog-centered modal-lg"
          >
            <ModalHeader
              toggle={() => setCenteredModal(!centeredModal)}
            ></ModalHeader>

            <ModalBody>
              <InputGroup className="input-group-merge">
                <Input
                  className="search-product"
                  placeholder="جستجو کاریر..."
                  onChange={(e) => setSearchProduct(e.target.value)}
                  value={searchProduct}
                />
                <InputGroupText>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
              </InputGroup>
              <UserModelTable
                data={current}
                pagination
                responsive
                // data ={dataToRender}
                isLoading={isLoading}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                centeredModal={centeredModal}
                setCenteredModal={setCenteredModal}
                // paginationComponent = {CustomPagination}
                // handlePerPage = {handlePerPage}
              />
            </ModalBody>
          </Modal>
        </Col>
      </Row>

      <Row>
        <Col style={{ marginTop: 20 }}>
          <ScheduleUserListTable
            data={users}
            isLoading={loading}
            selectedId={selectedId}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ScheduleUserList;
