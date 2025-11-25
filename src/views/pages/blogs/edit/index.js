// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import Select from "react-select";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import { useMutation } from "@tanstack/react-query";
import { UpdateNewsApi } from "../../../../core/Services/api/News/UpdateNews";

const BlogEdit = () => {
  // ** ValidationSchema
  const validationSchema = yup.object({
    GoogleDescribe: yup
      .string()
      .min(70, "توضیحات گوگل نمیتواند کمتر 70 کاراکتر باشد")
      .max(150, "توضیحات گوگل نمیتواند بیشتر از 150 کاراکتر باشد")
      .required("پرکردن این فیلد ضروری است"),
    Keyword: yup
      .string()
      .min(10, "کلمات کلیدی نمیتواند کمتر از 10 کاراکتر باشد")
      .max(300, "کلمات کلیدی نمیتواند بیشتر از 300 کاراکتر باشد")
      .required("پرکردن این فیلد ضروری است"),
    Describe: yup.string().required("پرکردن این فیلد ضروری است"),
    MiniDescribe: yup.string().required("پرکردن این فیلد ضروری است"),
    GoogleTitle: yup.string().required("پرکردن این فیلد ضروری است"),
    Title: yup.string().required("پرکردن این فیلد ضروری است"),
  });

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
  const [data, setData] = useState(null),
    [title, setTitle] = useState(""),
    [slug, setSlug] = useState(""),
    [status, setStatus] = useState(""),
    [content, setContent] = useState(editorState),
    [blogCategories, setBlogCategories] = useState([]),
    [featuredImg, setFeaturedImg] = useState(null),
    [imgPath, setImgPath] = useState("banner.jpg"),
    [selectedFile,setSelectedFile] = useState(null)

  // useEffect(() => {
  //   axios.get("/blog/list/data/edit").then((res) => {
  //     setData(res.data);
  //     setTitle(res.data.blogTitle);
  //     setSlug(res.data.slug);
  //     setBlogCategories(res.data.blogCategories);
  //     setFeaturedImg(res.data.featuredImage);
  //     setStatus(res.data.status);
  //   });
  // }, []);

  const categories = [
    { value: "fashion", label: "Fashion" },
    { value: "gaming", label: "Gaming" },
    { value: "quote", label: "Quote" },
    { value: "video", label: "Video" },
    { value: "food", label: "Food" },
  ];

  // useMutation
   const {mutateAsync,isError,isPending,isSuccess} = useMutation({
      mutationFn: UpdateNewsApi
   })

  const onChange = (e) => {
    setSelectedFile(e.target.file[0])
  };

  const handleSubmit = async (values) => {
   const formData = new FormData();
   formData.append("Title",values.Title);
   formData.append("GoogleTitle",values.GoogleTitle);
   formData.append("Describe",values.Describe);
   formData.append("MiniDescribe",values.MiniDescribe);
   formData.append("GoogleDescribe",values.GoogleDescribe);
   formData.append("Keyword",values.Keyword);
   formData.append("Image",selectedFile);
   
   await mutateAsync(formData)
  };

  return (
    <div className="blog-edit-wrapper">
      {data !== null ? (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div className="d-flex">
                  <div>
                    <Avatar
                      className="me-75"
                      img={data.avatar}
                      imgWidth="38"
                      imgHeight="38"
                    />
                  </div>
                  <div>
                    <h6 className="mb-25">{data.userFullName}</h6>
                    <CardText>{data.createdTime}</CardText>
                  </div>
                </div>
                <Formik
                  className="mt-2"
                  initialValues={{
                    Title: "",
                    GoogleTitle: "",
                    Keyword: "",
                    MiniDescribe: "",
                    Describe: "",
                    GoogleDescribe: "",
                    Image: "",
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  
                  <Form>
                    <Row>
                      <Col md="6" className="mb-2">
                        <Label className="form-label" for="blog-edit-title">
                          Title
                        </Label>
                        <Field
                          name={"Title"}
                          id="blog-edit-title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </Col>
                      <Col md="6" className="mb-2">
                        <Label className="form-label" for="blog-edit-category">
                          Category
                        </Label>
                        <Select
                          id="blog-edit-category"
                          isClearable={false}
                          theme={selectThemeColors}
                          value={blogCategories}
                          isMulti
                          name="colors"
                          options={categories}
                          className="react-select"
                          classNamePrefix="select"
                          onChange={(data) => setBlogCategories(data)}
                        />
                      </Col>
                      <Col md="6" className="mb-2">
                        <Label className="form-label" for="blog-edit-slug">
                          Slug
                        </Label>
                        <Field
                          id="blog-edit-slug"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                        />
                      </Col>
                      <Col md="6" className="mb-2">
                        <Label className="form-label" for="blog-edit-status">
                          Status
                        </Label>
                        <Input
                          type="select"
                          id="blog-edit-status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Published">Published</option>
                          <option value="Pending">Pending</option>
                          <option value="Draft">Draft</option>
                        </Input>
                      </Col>
                      <Col sm="12" className="mb-2">
                        <Label className="form-label">Content</Label>
                        <Editor
                          editorState={content}
                          onEditorStateChange={(data) => setContent(data)}
                        />
                      </Col>
                      <Col className="mb-2" sm="12">
                        <div className="border rounded p-2">
                          <h4 className="mb-1">Featured Image</h4>
                          <div className="d-flex flex-column flex-md-row">
                            <img
                              className="rounded me-2 mb-1 mb-md-0"
                              src={featuredImg}
                              alt="featured img"
                              width="170"
                              height="110"
                            />
                            <div>
                              <small className="text-muted">
                                Required image resolution 800x400, image size
                                10mb.
                              </small>

                              <p className="my-50">
                                <a href="/" onClick={(e) => e.preventDefault()}>
                                  {`C:/fakepath/${imgPath}`}
                                </a>
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
                      <Col className="mt-50">
                        <Button color="primary" className="me-1">
                          Save Changes
                        </Button>
                        <Button color="secondary" outline>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default BlogEdit;
