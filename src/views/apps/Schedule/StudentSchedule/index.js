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

  const apiParams = {
    PageNumber: 1,
    RowsOfPage: 1000,
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
  return (
    <div>
      <Row className="d-flex justify-content-between align-items-center">
        {/* <Col sm="6">
          <InputGroup className="input-group-merge">
            <Input
              className="search-product"
              placeholder="جستجو کاربران..."
              onChange={(e) => setSearchUser(e.target.value)}
              value={searchUser}
            />
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
          </InputGroup>
        </Col> */}
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
                isLoading={isLoading}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                centeredModal={centeredModal}
                setCenteredModal={setCenteredModal}
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
