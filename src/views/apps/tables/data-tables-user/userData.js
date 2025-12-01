// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { MoreVertical, Edit, FileText, Archive, Trash } from "react-feather";
import defaultpPic from "../../../../assets/images/defalt.png";

// ** Expandable table component
const userExpandableTable = ({ data }) => {
  return (
    <div className="expandable-content p-2">
      <p>
        <span className="fw-bold">نام دانشجو:</span> {data.user?.fName}{" "}
        {data.user?.lName}
      </p>
      <p>
        <span className="fw-bold">ایمیل دانشجو:</span> {data.user?.userName}
      </p>
      <div>
      <Avatar img={data.user?.currentPictureAddress || defaultpPic} />
      </div>
      {/* <p className="m-0">
        <span className="fw-bold">وضعیت تایید:</span>{" "}
        {data.accepted ? "تایید شده" : "تایید نشده"}
      </p> */}
    </div>
  );
};

// ** Table Server Side Column
export const serverSideColumns = [
  {
    name: "عکس دانشجو",
    cell: (row) => (
      <Avatar img={row.user?.currentPictureAddress || defaultpPic} />
    )
  },
  {
    name: "نام دانشجو",
    selector: (row) => `${row.user?.fName} ${row.user?.lName}`,
    sortable: true,
  },
  {
    name: "ایمیل دانشجو",
    selector: (row) => {
      return row.user?.userName
    },
    
    sortable: true,
  },

  ,
  // {
  //   name: "وضعیت تایید",
  //   selector: (row) => row.accepted,
  //   cell: (row) =>
  //     row.accepted ? (
  //       <Badge color="light-success">تایید شده</Badge>
  //     ) : (
  //       <Badge color="light-danger">تایید نشده</Badge>
  //     ),
  //   sortable: true,
  // },
];

export default userExpandableTable;
