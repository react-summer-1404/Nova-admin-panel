// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { Edit } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
} from "reactstrap";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTechList } from "../../../../core/Services/api/TechSection";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

const TableTech = ({ data, isLoading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const mutationEditTech = useMutation({
    mutationFn: editTechList,
    onSuccess: () => {
      toast.success("تکنولوژی با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["getTechList"]);
    },

    onError: () => toast.error("خطا در ویرایش تکنولوژی"),
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil((data?.length || 0) / perPage);

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      activeClassName="active"
      forcePage={currentPage - 1}
      onPageChange={(page) => handlePagination(page.selected + 1)}
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  const dataToRender = data?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عکس</th>
            <th>عنوان</th>
            <th>توضیح </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="d-flex justify-content-center">
                <Spinner
                  color="primary"
                  className="d-flex justify-content-center"
                />
                ;
              </td>
            </tr>
          ) : (
            dataToRender?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    className="me-75 rounded"
                    src={item.iconAddress || defaultpPic}
                    height="30"
                    width="30"
                  />
                </td>

                <td className="fw-bold text-black">{item.techName}</td>

                <td>
                  <p style={{ color: "#7367f0" }}>{item.describe}</p>
                </td>

                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit
                      size={15}
                      className="ms-50"
                      style={{ marginLeft: "6px" }}
                    />
                    ادیت
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <CustomPagination />
      {/* Modal */}
      <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش تکنولوژی</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                techName: selectedItem.techName,
                describe: selectedItem.describe,
                iconAddress: selectedItem.iconAddress,
              }}
              onSubmit={(values) => {
                mutationEditTech.mutate({
                  ...values,
                  id: selectedItem.id,
                });
                handleCloseModal();
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Field
                    name="techName"
                    className="form-control mb-1"
                    placeholder="نام تکنولوژی"
                  />
                  <Field
                    name="describe"
                    className="form-control mb-1"
                    placeholder="توضیحات"
                  />
                  <Field
                    name="iconAddress"
                    className="form-control mb-1"
                    placeholder="آدرس آیکون"
                  />

                  <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                      ذخیره
                    </Button>
                    <Button color="secondary" onClick={handleCloseModal}>
                      بستن
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default TableTech;




// // ** Custom Components
// import React from "react";
// import { Formik, Form, Field } from "formik";
// // ** Images
// import defaultpPic from "../../../../assets/images/defalt.png";
// // ** Icons Imports
// import { Edit } from "react-feather";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Alert,
//   Spinner,
// } from "reactstrap";

// // ** Reactstrap Imports
// import { Table } from "reactstrap";
// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { editTechList } from "../../../../core/Services/api/TechSection";
// import toast from "react-hot-toast";
// import ReactPaginate from "react-paginate";

// const TableTech = ({ data, isLoading }) => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [perPage, setPerPage] = useState(8);
//   const [currentPage, setCurrentPage] = useState(1);
//   const queryClient = useQueryClient();
//   const mutationEditTech = useMutation({
//     mutationFn: editTechList,
//     onSuccess: () => {
//       toast.success("تکنولوژی با موفقیت ویرایش شد");
//       queryClient.invalidateQueries(["getTechList"]);
//     },

//     onError: () => toast.error("خطا در ویرایش تکنولوژی"),
//   });

//   const handleEditClick = (item) => {
//     setSelectedItem(item);
//   };

//   const handleCloseModal = () => setSelectedItem(null);
//   const handlePagination = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const pageCount = Math.ceil((data?.length || 0) / perPage);

//   const CustomPagination = () => (
//     <ReactPaginate
//       previousLabel={""}
//       nextLabel={""}
//       breakLabel="..."
//       pageCount={pageCount}
//       marginPagesDisplayed={2}
//       pageRangeDisplayed={2}
//       activeClassName="active"
//       forcePage={currentPage - 1}
//       onPageChange={(page) => handlePagination(page.selected + 1)}
//       pageClassName="page-item"
//       breakClassName="page-item"
//       nextLinkClassName="page-link"
//       pageLinkClassName="page-link"
//       breakLinkClassName="page-link"
//       previousLinkClassName="page-link"
//       nextClassName="page-item next-item"
//       previousClassName="page-item prev-item"
//       containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
//     />
//   );

//   const dataToRender = data?.slice(
//     (currentPage - 1) * perPage,
//     currentPage * perPage
//   );
//   return (
//     <>
//       <Table hover responsive>
//         <thead>
//           <tr>
//             <th>عکس</th>
//             <th>عنوان</th>
//             <th>توضیح </th>
//             <th>اقدام</th>
//           </tr>
//         </thead>
//         <tbody>
//           {isLoading ? (
//             <tr>
//               <td colSpan="4" className="d-flex justify-content-center">
//                 <Spinner
//                   color="primary"
//                   className="d-flex justify-content-center"
//                 />
//                 ;
//               </td>
//             </tr>
//           ) : (
//             dataToRender?.map((item) => (
//               <tr key={item.id}>
//                 <td>
//                   <img
//                     className="me-75 rounded"
//                     src={item.iconAddress || defaultpPic}
//                     height="30"
//                     width="30"
//                   />
//                 </td>

//                 <td className="fw-bold text-black">{item.techName}</td>

//                 <td>
//                   <p style={{ color: "#7367f0" }}>{item.describe}</p>
//                 </td>

//                 <td>
//                   <Button
//                     color="primary"
//                     size="sm"
//                     onClick={() => handleEditClick(item)}
//                   >
//                     <Edit
//                       size={15}
//                       className="ms-50"
//                       style={{ marginLeft: "6px" }}
//                     />
//                     ادیت
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </Table>
//       <CustomPagination />
//       {/* Modal */}
//       <Modal
//         isOpen={selectedItem ? true : false}
//         toggle={handleCloseModal}
//         className="modal-dialog-centered"
//       >
//         <ModalHeader toggle={handleCloseModal}>ویرایش تکنولوژی</ModalHeader>

//         <ModalBody>
//           {selectedItem && (
//             <Formik
//               initialValues={{
//                 techName: selectedItem.techName,
//                 describe: selectedItem.describe,
//                 iconAddress: selectedItem.iconAddress,
//               }}
//               onSubmit={(values) => {
//                 mutationEditTech.mutate({
//                   ...values,
//                   id: selectedItem.id,
//                 });
//                 handleCloseModal();
//               }}
//             >
//               {({ handleSubmit }) => (
//                 <Form>
//                   <Field
//                     name="techName"
//                     className="form-control mb-1"
//                     placeholder="نام تکنولوژی"
//                   />
//                   <Field
//                     name="describe"
//                     className="form-control mb-1"
//                     placeholder="توضیحات"
//                   />
//                   <Field
//                     name="iconAddress"
//                     className="form-control mb-1"
//                     placeholder="آدرس آیکون"
//                   />

//                   <ModalFooter>
//                     <Button color="primary" onClick={handleSubmit}>
//                       ذخیره
//                     </Button>
//                     <Button color="secondary" onClick={handleCloseModal}>
//                       بستن
//                     </Button>
//                   </ModalFooter>
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </ModalBody>
//       </Modal>
//     </>
//   );
// };
// export default TableTech;
