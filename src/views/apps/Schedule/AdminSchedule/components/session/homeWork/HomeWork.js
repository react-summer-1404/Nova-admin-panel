import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { getSessionHomeWorks } from "../../../../../../../core/Services/api/session/Session";

const HomeWork = ({showHmModal,setShowHmModal,ScheduleId}) => {
    const apiParams ={
        SessionId:ScheduleId
    }
    const {data:homeWorkList,isLoading} =useQuery({
        queryKey:["getSessionHomeWorks"],
        queryFn:()=>getSessionHomeWorks(apiParams)
    })
  return (
    <div>
      <Modal
        isOpen={showHmModal}
        toggle={() => setShowHmModal(!showHmModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCentralModal(!showHmModal)}>
          تکالیف
        </ModalHeader>

        <ModalBody>
            <div>
            <Table hover responsive>
            <thead>
            <tr>
              <th>عنوان تکلیف</th>
              <th>توضیحات تکلیف </th>
              <th>تاریح تکلیف</th>
              <th>اقدام</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="d-flex justify-content-center">
                  <Spinner color="primary" />
                </td>
              </tr>
            ) : (
                homeWorkList?.map((item) => {
                
                return (
                  <tr key={item.id}>
                    <td className="text-black fw-bold">{foundedItem?.hwTitle}</td>
                    <td>{item.hwDescribe}</td>

                  
                    <td>
                      <p>{item.homeWorkDate?.slice(0, 10)}</p>
                    </td>

                    <td>
                      {item.AP ? (
                        <Badge color="light-success">میتواند</Badge>
                      ) : (
                        <Badge color="light-danger">نمیتواند</Badge>
                      )}
                    </td>

                    <td>
                      {/* <UncontrolledDropdown>
                        <DropdownToggle
                          className="icon-btn hide-arrow"
                          color="transparent"
                          size="sm"
                          caret
                          onClick={() => setSelected(item)}
                        >
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() =>
                              editAp.mutate({ active: !item.AP, id: item.id })
                            }
                          >
                            <Edit className="me-50" size={15} />
                            تغییر وضعیت
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setCentralModal(!centralModal)}
                          >
                            <Edit className="me-50" size={15} />
                            <span className="align-middle">نمایش جلسه</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown> */}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
            </Table>
            </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default HomeWork;
