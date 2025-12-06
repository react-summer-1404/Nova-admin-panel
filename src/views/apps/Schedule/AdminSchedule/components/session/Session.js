import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Badge,
} from "reactstrap";
import {
  deleteSession,
  getSessionDetails,
} from "../../../../../../core/Services/api/session/Session";
import { useState } from "react";
import HomeWork from "./homeWork/HomeWork";
import AddFile from "./file/AddFile";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, {
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
} from "swiper";
import toast from "react-hot-toast";

const Session = ({ setCentralModal, centralModal, ScheduleId }) => {
  const [showHmModal, setShowHmModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const queryClient = useQueryClient();
  console.log("sele", selectedImg?.id);
  SwiperCore.use([
    Navigation,
    Pagination,
    EffectFade,
    EffectCube,
    EffectCoverflow,
    Autoplay,
    Lazy,
    Virtual,
  ]);

  const apiParams = {
    SessionId: ScheduleId,
  };
  const { data: sessionDetail } = useQuery({
    queryKey: ["getSessionDetails", apiParams],
    queryFn: () => getSessionDetails(apiParams),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSession(id),
    onSuccess: () => {
      toast.success("عکس مورد نظر حذف شد");
      queryClient.invalidateQueries(["getSessionDetails", apiParams]);
    },
    onError: (error) => {
      console.log("error====>", error);
      const msg = error?.response?.data?.message;
      toast.error(msg);
    },
  });
 
  return (
    <div>
      <Modal
        isOpen={centralModal}
        toggle={() => setCentralModal(!centralModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCentralModal(!centralModal)}>
          جزییات جلسه
        </ModalHeader>

        <ModalBody>
          <div className="d-flex justify-content-between  flex-column ">
            <Card>
              <CardBody>
                <div className="d-flex gap-1 align-items-center">
                  <h5>عنوان جلسه :</h5>
                  <p>{sessionDetail?.sessionTitle}</p>
                </div>
                <div className="d-flex gap-1 align-items-center">
                  <h5> تاریخ ثبت :</h5>
                  <p>
                    {sessionDetail?.sessionFileDtos?.[0]?.insertDate?.slice(
                      0,
                      10
                    )}
                  </p>
                </div>
              </CardBody>
            </Card>
            <div className="d-flex flex-column gap-1">
              <Card>
                <CardBody style={{ width: "100%", height: 200 }}>
                  {sessionDetail?.sessionFileDtos?.length > 0 ? (
                    <Swiper
                      style={{ width: "100%" }}
                      navigation
                      pagination={{ clickable: true }}
                    >
                      {sessionDetail.sessionFileDtos.map((file) => (
                        <SwiperSlide key={file.id }>
                          <div style={{ position: "relative" }}>
                            <img
                              src={file.fileAddress}
                              alt="file"
                              style={{ width: "100%", height: 150 }}
                            />
                            <Badge
                               onClick={() => {
                                deleteMutation.mutate({ sessionFileId: file.id });
                              }}
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                cursor: "pointer",
                              }}
                              pill
                              color="danger"
                            >
                              حذف
                            </Badge>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p>فایلی وجود ندارد !</p>
                  )}
                </CardBody>
              </Card>
              <div className="d-flex flex-column gap-1">
                <Button
                  color="primary"
                  className="w-100"
                  onClick={() => setShowFileModal(!showFileModal)}
                >
                  افزودن فایل +
                </Button>

                <Button
                  color="warning"
                  className="w-100"
                  onClick={() => setShowHmModal(!showHmModal)}
                >
                  تکلیف
                </Button>
              </div>
            </div>
          </div>
          {/* modals */}
          <HomeWork
            setShowHmModal={setShowHmModal}
            showHmModal={showHmModal}
            ScheduleId={ScheduleId}
          />
          <AddFile
            setShowFileModal={setShowFileModal}
            showFileModal={showFileModal}
            ScheduleId={ScheduleId}
            apiParams={apiParams}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Session;
