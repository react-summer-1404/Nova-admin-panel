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
import { getProducts } from "../../../../core/Services/api/getCourseList";
import { getUserList } from "../../../../core/Services/api/useSection/inedx";

function CourseUserList() {
  const [centeredModal, setCenteredModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const apiParams = {
    PageNumber: 1,
    RowsOfPage: 1000
  };
  const userApiParams ={
    PageNumber: 1,
    RowsOfPage: 1000,
    CourseId:selectedId
  }
  const { data: courses, isLoading } = useQuery({
    queryFn: () => getProducts(apiParams),
    queryKey: ["productsList", apiParams],
    refetchOnWindowFocus:false
  });
  
console.log(selectedId)
  
const current=courses?.courseDtos
const { data: users,isLoading:loading } = useQuery({
    queryFn: () => getUserList(userApiParams),
    queryKey: ["userCourseList", userApiParams],
    enabled:!!selectedId,
    refetchOnWindowFocus:false
  });
  console.log("users",users)
  return (
    <div>
      <Row className="d-flex justify-content-between align-items-center">
      <Col sm='6' >
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='جستجو...'
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
        <Col xl="3" md="4" sm="6">
        <Button
          color="relief-primary"
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
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}></ModalHeader>

          <ModalBody>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='جستجو...'
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
           <TableProduct data={current} isLoading={isLoading} selectedId={selectedId} setSelectedId={setSelectedId} centeredModal={centeredModal} setCenteredModal={setCenteredModal}/>
          </ModalBody>
        </Modal>
        </Col>
      </Row>

      <Row>
        <Col style={{marginTop:20}}>
          <TableUserList data={users} isLoading={loading} selectedId={selectedId}/>
        </Col>
      </Row>
    </div>
  );
}

export default CourseUserList;
