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
import TableProduct from "../../tables/productListTable/TableProduct";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductsCourse } from "../../../../core/Services/api/getCourseList";
import { getUserList } from "../../../../core/Services/api/useSection/inedx";
import { useDebounce } from "use-debounce";

function CourseUserList() {
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
    PageNumber: 1,
    RowsOfPage: 1000,
    CourseId: selectedId,
    Query: debounceUser,
  };
  const { data: courses, isLoading } = useQuery({
    queryFn: () => getProductsCourse(apiParams),
    queryKey: ["productsList", apiParams],
    refetchOnWindowFocus: false,
  });

  const current = courses?.courseDtos;
  const { data: users, isLoading: loading } = useQuery({
    queryFn: () => getUserList(userApiParams),
    queryKey: ["userCourseList", userApiParams],
    enabled: !!selectedId,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <Row className="d-flex justify-content-between align-items-center">
        <Col sm="6">
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
        </Col>
        <Col xl="3" md="4" sm="6">
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => setCenteredModal(!centeredModal)}
          >
            انتخاب دوره
          </Button>
          <Modal
            isOpen={centeredModal}
            toggle={() => setCenteredModal(!centeredModal)}
            className="modal-dialog-centered"
          >
            <ModalHeader
              toggle={() => setCenteredModal(!centeredModal)}
            ></ModalHeader>

            <ModalBody>
              <InputGroup className="input-group-merge">
                <Input
                  className="search-product"
                  placeholder="جستجو دوره..."
                  onChange={(e) => setSearchProduct(e.target.value)}
                  value={searchProduct}
                />
                <InputGroupText>
                  <Search className="text-muted" size={14} />
                </InputGroupText>
              </InputGroup>
              <TableProduct
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
          <TableUserList
            data={users}
            isLoading={loading}
            selectedId={selectedId}
          />
        </Col>
      </Row>
    </div>
  );
}

export default CourseUserList;
