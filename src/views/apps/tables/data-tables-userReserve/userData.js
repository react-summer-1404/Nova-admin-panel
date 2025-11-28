// // ** Custom Components
// import Avatar from "@components/avatar";

// // ** Reactstrap Imports
// import {
//   Badge,
// } from "reactstrap";

// // ** Expandable table component
// const userExpandableTable = ({ data }) => {
//   return (
//     <div className="expandable-content p-2">
//       <p>
//         <span className="fw-bold">نام دانشجو:</span> {data?.studentName}
//       </p>
//       <p>
//         <span className="fw-bold"> نام دوره:</span> {data?.courseName}
//       </p>
     
//       <p className="m-0">
//         <span className="fw-bold">وضعیت تایید:</span>
//         {data.accepted ? "تایید شده" : "تایید نشده"}
//       </p>
     
//     </div>
//   );
// };

// // ** Table Server Side Column
// export const serverSideColumns = [
//   {
//     name: "نام دانشجو",
//     selector: (row) => row.studentName,
//     sortable: true,
//   },
//   {
//     name: " نام دوره",
//     selector: (row) => {
//       return row.courseName
//     },
    
//     sortable: true,
//   },

//   ,
//   {
//     name: "وضعیت تایید",
//     selector: (row) => row.accepted,
//     cell: (row) =>
//       row.accepted ? (
//         <Badge color="light-success">تایید شده</Badge>
//       ) : (
//         <Badge color="light-danger">تایید نشده</Badge>
//       ),
//     sortable: true,
//   },
// ];

// export default userExpandableTable;
