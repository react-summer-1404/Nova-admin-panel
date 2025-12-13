import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import toast from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";

export function CorrectTextAi() {
  const [paragraph, setParagraph] = useState();
  const [disabledModal, setDisabledModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    toast.success("متن با موفقیت کپی شد");
  };

  const makeParagraph = async (keyword) => {
    setLoading(true);
    const respons = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Nova",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "admin",
              content: `یه پاراگراف راجب این کلمه بنویس ${keyword}`,
            },
          ],
        }),
      }
    );
    const data = await respons.json();
    setParagraph(data.choices[0].message.content);
    setLoading(false);
  };

  return (
    <>
      <Button.Ripple
        color="secondary"
        onClick={() => setDisabledModal(!disabledModal)}
      >
        تولید متن به کمک هوش مصنوعی
      </Button.Ripple>

      <Modal
        isOpen={disabledModal}
        toggle={() => setDisabledModal(!disabledModal)}
        className="modal-dialog-centered"
        backdrop={false}
      >
        <ModalHeader toggle={() => setDisabledModal(!disabledModal)}>
          استخراج متن به کمک هوش مصنوعی
        </ModalHeader>

        <ModalBody>
          {!paragraph && (
            <Formik
              initialValues={{ inputvalue: "" }}
              onSubmit={(values) => {
                makeParagraph(values.inputvalue);
              }}
            >
              <Form>
                <Field
                  type="text"
                  name="inputvalue"
                  className="form-control mb-1"
                  placeholder="کلیدواژه مدنظر خود را وارد کنید"
                />
                <Button color="primary" type="submit">
                  ارسال کلید واژه
                </Button>
              </Form>
            </Formik>
          )}

          <Row className=" mt-3 align-item-center">
            {loading && <p>در حال تولید متن...</p>}

            {paragraph && !loading && (
              <div className="mb-1 align-item-center">
                <Col xl="8" md="8" sm="12" className="mb-1 w-100 align-item-center">
                  <Input
                    value={paragraph}
                    style={{ whiteSpace: "pre-wrap" }}
                    type="textarea"
                    name="text"
                    id="exampleText"
                    className="w-100"
                    rows="15"
                  />
                </Col>

                <Col md="2" sm="12" className="align-item-center">
                  <CopyToClipboard text={paragraph} onCopy={onCopy}>
                    <Button color="primary" outline>
                      کپی 
                    </Button>
                  </CopyToClipboard>
                </Col>
              </div>
            )}
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setParagraph(null);
              setCopied(false);
              setLoading(false);
              setDisabledModal(false);
            }}
          >
            بستن
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
