// ** Custom Components
import React from "react";
// ** Images
import Avatar from "@components/avatar";

import defaultpPic from "../../../../assets/images/defalt.png";

// ** Reactstrap Imports
import { Table, Spinner } from "reactstrap";
import { Alert } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { getGroupList } from "../../../../core/Services/api/getGroup";

const ScheduleUserListTable = ({
  data,
  isLoading,
}) => {
  const { data: groups } = useQuery({
    queryKey: ["getGroupList2"],
    queryFn: getGroupList,
  });
  const cr = groups?.courseGroupDtos;
  if (!selectedId) {
    return (
      <div className="text-center p-4">
        <Alert color="primary">
          <div className="alert-body">
            <span className="fw-bold">لطفا یک کاربر را انتخاب کنید</span>
          </div>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Spinner color="primary" className="d-flex justify-content-center" />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4">
        <Alert color="warning">
          <div className="alert-body">
            <span className="fw-bold">کاربری برای این دوره یافت نشد</span>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>نام گروه</th>
            <th>ساعت شروع</th>
            <th>ساعت پایان </th>
            <th>تاریخ</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            const foundedItem = cr?.find((g) => g.id == item.courseGroupId);
            console.log("first", foundedItem);
            return (
              <tr key={item.id}>
                <td className="fw-bold text-black">
                  <p>{foundedItem?.groupName}</p>
                </td>
                <td className="fw-bold text-black">
                  <span>{item.startTime}</span>
                </td>
                <td>{item.endTime}</td>
                <td className="fw-bold text-black">
                  {item.startDate?.slice(0, 10)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ScheduleUserListTable;
