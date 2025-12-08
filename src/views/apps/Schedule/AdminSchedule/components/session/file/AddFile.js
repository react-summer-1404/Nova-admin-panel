import React from "react";
// ** React Imports
import { Suspense } from "react";

import { Fragment, useState } from "react";

// ** Icons Imports
import { Link, Upload } from "react-feather";

// ** Reactstrap Imports
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import FileUpload from "./FileUpload";
import UploadURL from "./UploadURL";

const AddFile = ({ showFileModal, setShowFileModal ,ScheduleId,apiParams}) => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <div>
      <Modal
        isOpen={showFileModal}
        toggle={() => setShowFileModal(!showFileModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => setShowFileModal(!showFileModal)}>
          فایل جلسه
        </ModalHeader>
        <ModalBody>
          <Nav pills justified style={{ marginBottom: 30 }}>
            <NavItem>
              <NavLink
                active={active === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                <Upload size={18} />
                <span className="align-middle">اپلود فایل</span>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active={active === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                <Link size={18} />
                <span className="align-middle">فرستادن ادرس</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="1">
              {/* upload file */}
              <Suspense>
              <FileUpload ScheduleId={ScheduleId} apiParams={apiParams}/>
              </Suspense>
            </TabPane>

            <TabPane tabId="2">
              {/* URl upload  */}
              <Suspense>
                <UploadURL ScheduleId={ScheduleId}/>
              </Suspense>
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddFile;
