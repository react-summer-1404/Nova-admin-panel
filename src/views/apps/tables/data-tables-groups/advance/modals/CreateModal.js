import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import TableStatus from "../../tables/statusListTable/TableStatus";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { createGroup } from "../../../../../../core/Services/api/getGroup";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store";



const CreateModal = ({courseId,centeredModal,setCenteredModal}) => {

    const dispatch = useDispatch();
    const teacherId = useSelector(state => state.ecommerce.productDetail.teacherId)
  
    const mutationCreateGroupe = useMutation({
        mutationFn: (formData) => createGroup(formData),
        onSuccess: () => {
          toast.success("گروه جدید با موفقیت اضافه شد");
          setCenteredModal(false);
      
          dispatch(getData({ courseId, teacherId }));
        },
        onError: () => toast.error("خطا در افزودن گروه"),
      });
      

  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        
      
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن گروه
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                GroupName: "",
                CourseId: courseId,
                GroupCapacity: "",
              }}
              onSubmit={(values) => {
                const formData = new FormData;
                formData.append("GroupName",values.GroupName),
                formData.append("CourseId",values.CourseId),
                formData.append("GroupCapacity",values.GroupCapacity),
                mutationCreateGroupe.mutate(formData);
              }}
            >
                {({handleSubmit})=>(
                     <Form>
                     <Field
                       name="GroupName"
                       className="form-control mb-1"
                       placeholder="نام گروه"
                     />
     
                     <Field
                     type="number"
                       name="GroupCapacity"
                       className="form-control mb-1"
                       placeholder="ظرفیت"
                     />
                    
     
                     <ModalFooter>
                       <Button color="primary" onClick={handleSubmit}>
                         ذخیره
                       </Button>
                       <Button
                         color="secondary"
                         onClick={() => setCenteredModal(!centeredModal)}
                       >
                         بستن
                       </Button>
                     </ModalFooter>
                   </Form>
                )}
             
            </Formik>
          </ModalBody>
        </Modal>
      </Col>

      <Col md="9">
        <Card>
          {/* <TableStatus data={data} isLoading={isLoading} /> */}
        </Card>
      </Col>
    </Row>
  );
};

export default CreateModal;
