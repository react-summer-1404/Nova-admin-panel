import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { EditSchedualSingle } from "../../../../../../core/Services/api/Schedule";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import { Table } from "reactstrap";
import { Edit, MoreVertical } from "react-feather";
import toast from "react-hot-toast";

const AdminScheduleTable = ({ isLoading, apiParams, data, groups }) => {
  const [selected, setSelected] = useState("");
  const queryClient = useQueryClient();
  console.log("selected", selected);

  const editAp = useMutation({
    mutationFn: (apiData) => EditSchedualSingle(apiData),
    onSuccess: () => {
      toast.success("وضعیت تغییر کرد");
      queryClient.invalidateQueries(["getAdminSchedules", apiParams]);
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      console.log("error======>", error);
    },
  });
  return (
    <>
      <div className="content-body">
        <Table hover responsive>
          <thead>
            <tr>
              <th>نام گروه</th>
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
                const foundedItem = groups?.find(
                  (g) => g.id == item.courseGroupId
                );
                return (
                  <tr key={item.id}>
                    <td className="text-black fw-bold">{foundedItem?.groupName}</td>
                    <td>{item.startTime}</td>

                    <td>
                      <p>{item.endTime}</p>
                    </td>
                    <td>
                      <p>{item.startDate?.slice(0, 10)}</p>
                    </td>

                    <td>
                      {item.AP ? (
                        <Badge color="light-success">میتواند</Badge>
                      ) : (
                        <Badge color="light-danger">نمیتواند</Badge>
                      )}
                    </td>

                    <td>
                      <UncontrolledDropdown>
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
                            onClick={() => handleEditTimeClick(item)}
                          >
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
