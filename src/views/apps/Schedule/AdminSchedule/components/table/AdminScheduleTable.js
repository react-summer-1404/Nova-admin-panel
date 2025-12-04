import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAdminSchedules } from "../../../../../../core/Services/api/Schedule";
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, Spinner, UncontrolledDropdown } from "reactstrap";
import { Table } from "reactstrap";
import { Edit, MoreVertical } from "react-feather";
import DatePickerComponent from "../DatePickerComponent";

const AdminScheduleTable = ({picker}) => {
 
   const apiParams = {
  startDate: picker[0],
  endDate: picker[1],
};

const { data, isLoading } = useQuery({
  queryKey: ["getAdminSchedules", apiParams],
  queryFn: () => getAdminSchedules(apiParams),
});
  return (
    <>

        <div className="content-body">
        <Table hover responsive>
            <thead>
              <tr>
                <th>ساعت شروع</th>
                <th>ساعت پایان </th>
                <th>تاریخ شروع</th>
                <th>حالت حضور</th>
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
                data?.map((item) => {
                    
                      
                  return (
                    <tr key={item.id}>
                      <td >{item.startTime}</td>

                      <td>
                        <p >{item.endTime}</p>
                      </td>
                      <td>
                        <p >{item.startDate?.slice(0,10)}</p>
                      </td>

                      <td>
                        {item.AP ? (
                          <Badge color="light-success">AP</Badge>
                        ) : (
                          <Badge color="light-danger">AP</Badge>
                        )}
                      </td>

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
                          <Edit className="me-50" size={15} />
                          <span className="align-middle">ادیت ترم</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditTimeClick(item)}>
                          <Edit className="me-50" size={15} />
                          <span className="align-middle">ادیت زمان</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                      </td>
                    </tr>
                  );
                })
              )}
              
            </tbody>
          </Table>
        </div>
      

    </>
  );
};

export default AdminScheduleTable;
