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
import { createGroup, createSocialGroup } from "../../../../../../core/Services/api/getGroup";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store";



const CreateModal = ({courseId,centeredModal,setCenteredModal}) => {

    const dispatch = useDispatch();
  
    const mutationCreateSocialGroupe = useMutation({
        mutationFn: (apiData) => createSocialGroup(apiData),
        onSuccess: () => {
          toast.success("گروه جدید با موفقیت اضافه شد");
          setCenteredModal(false);
      
          dispatch(getData({ courseId}));
        },
        onError: (error) =>{ toast.error("خطا در افزودن گروه")
      console.log("error",error)},
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
                groupName: "",
                courseId: courseId,
                groupLink: "",
              }}
              onSubmit={(values) => {
                mutationCreateSocialGroupe.mutate(values);
                console.log("values",values)
              }}
            >
                {({handleSubmit})=>(
                     <Form>
                     <Field
                       name="groupName"
                       className="form-control mb-1"
                       placeholder="نام گروه"
                     />
     
                     <Field
                       name="groupLink"
                       className="form-control mb-1"
                       placeholder="لینک گروه"
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
