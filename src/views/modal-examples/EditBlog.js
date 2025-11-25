// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
import Select from "react-select";
import { User, Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import instance from "../../core/interseptor/Interseptor";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const defaultValues = {
  firstName: "Bob",
  lastName: "Barton",
  username: "bob.dev",
};

const EditBlogExample = () => {
  const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editorState = EditorState.createWithContent(contentState);

  // ** States
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null),
    [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [googleTitle, setGoogleTitle] = useState(""),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg");

  useEffect(() => {
    instance.get("/News/UpdateNews").then((res) => {
      // setData(res.data);
      // setTitle(res.data?.news?.blogTitle);
      // setSlug(res.data?.news?.slug);
      // setBlogCategories(res.data?.news?.blogCategories);
      // setFeaturedImg(res.data?.news?.featuredImage);
      setGoogleTitle(res.data?.news?.googleTitle);
    });
  }, []);

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    setImgPath(files[0].name);
    reader.onload = function () {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      return null;
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody className="text-right">
          <Button color="primary" onClick={() => setShow(true)}>
            ویرایش خبر
          </Button>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات خبر</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="blogTitle">
                عنوان
              </Label>
              <Controller
                control={control}
                name="blogTitle"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="blogTitle"
                      value={field.value}
                      invalid={errors.blogTitle && true}
                      
                    />
                  );
                }}
              />
              {errors.blogTitle && (
                <FormFeedback>Please enter a valid First Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="lastName">
                عنوان گوگل
              </Label>
              <Controller
                name="googleTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="googleTitle"
                    invalid={errors.googleTitle && true}
                    defaultValue={data?.news?.googleTitle}
                  />
                )}
              />
              {errors.lastName && (
                <FormFeedback>Please enter a valid Last Name</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="keywords">
                کلمات کلیدی
              </Label>
              <Input type="text" id="keywords" placeholder="" />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="status">
                انتخاب دسته بندی
              </Label>
              <Select
                id="status"
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                theme={selectThemeColors}
                defaultValue={statusOptions[0]}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="miniDescribe">
                توضیح کوتاه
              </Label>
              <Input id="miniDescribe" defaultValue="" placeholder="" />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="describe">
                توضیحات
              </Label>
              <Input id="describe" defaultValue="" placeholder="" />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="googleDescribe">
                توضیحات گوگل
              </Label>
              <Input id="googleDescribe" defaultValue="" placeholder="" />
            </Col>
            <Col className="col-12 col-md-6" sm="12">
            <Label className="form-label" for="googleDescribe">
               آپلود عکس
              </Label>
              <div>
                <div className="">
                  <div>
                    <p className="my-50">
                    </p>
                    <div className="d-inline-block">
                      <div className="mb-0">
                        <Input
                          type="file"
                          id="exampleCustomFileBrowser"
                          name="customFile"
                          onChange={onChange}
                          accept=".jpg, .png, .gif"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ثبت تغییرات
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => setShow(false)}
              >
                لغو
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default EditBlogExample;
