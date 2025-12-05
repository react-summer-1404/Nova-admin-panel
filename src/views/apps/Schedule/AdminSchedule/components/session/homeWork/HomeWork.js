import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { getSessionHomeWorks } from "../../../../../../../core/Services/api/session/Session";
import { MoreVertical } from "react-feather";
import AddHomeWork from "./AddHomeWork";

const HomeWork = ({ showHmModal, setShowHmModal, ScheduleId }) => {
    const [selectedHw ,setSelectedHw] =useState("")
  const apiParams = {
    SessionId: ScheduleId,
  };
  const { data: homeWorkList, isLoading } = useQuery({
    queryKey: ["getSessionHomeWorks"],
    queryFn: () => getSessionHomeWorks(apiParams),
  });

  return (
    <div>
      <Modal
        isOpen={showHmModal}
        toggle={() => setShowHmModal(!showHmModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => setShowHmModal(!showHmModal)}>
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
                ) : homeWorkList?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      تکلیفی وجود ندارد
                    </td>
                  </tr>
                ) : (
                  homeWorkList?.map((item) => (
                    <tr key={item.homeWorkId}>
                      <td className="text-black fw-bold">{item.hwTitle}</td>
                      <td>{item.hwDescribe}</td>
                      <td>{item.homeWorkDate?.slice(0, 10)}</td>
                      <td>
                       
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="icon-btn hide-arrow"
                            color="transparent"
                            size="sm"
                            caret
                            onClick={() => setSelectedHw(item)}
                          >
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>
                              {/* <Edit className="me-50" size={15} />
                            تغییر وضعیت */}
                            </DropdownItem>
                            <DropdownItem>
                              {/* <Edit className="me-50" size={15} />
                            <span className="align-middle">نمایش جلسه</span> */}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>{" "}
                       
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
          <Button color="primary">افزودن تکلیف </Button>
          <AddHomeWork ScheduleId={ScheduleId}/>
        </ModalBody>
      </Modal>

    </div>
  );
};
{
}
export default HomeWork;
