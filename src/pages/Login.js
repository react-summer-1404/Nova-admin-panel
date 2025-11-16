// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import PasswordField from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useMutation } from "@tanstack/react-query";
import { LoginApi } from "../core/services/Auth/Login/index";
import { setToken } from "../utility/hooks/localStorage";


const Login = () => {
  const navigate = useNavigate()
  const validationSchema = yup.object({
    phoneOrGmail: yup
      .string()
      .email("ایمیل معتبر نیست")
      .required("فیلد ایمیل نمی تواند خالی باشد"),
    password: yup
      .string()
      // .min(4, "پسورد نمیتواند کمتر از 4 کاراکتر باشد")
      // .max(15, "پسورد نمیتواند بیشتر از 15 کاراکتر باشد")
      // .matches(/[a-z]+/, "حداقل شامل یک حرف کوچک باشد")
      // .matches(/[A-Z]+/, "حداقل شامل یک حرف بزرگ باشد")
      // .matches(/\d+/, "پسورد باید شامل عدد باشد")
      .required("فیلدر پسورد نمیتواد خالی باشد"),
    rememberMe: yup.boolean(),
  });

  const postFormData =  () => {
    return useMutation ({
      mutationFn:LoginApi,
    })
  }

  const {mutateAsync,isError,isPending,isSuccess} = postFormData({
    
  })


  const { skin } = useSkin();

  const onFormSubmit = async (values) => {
    try{
      const data = await mutateAsync({
        phoneOrGmail: values.phoneOrGmail,
        password: values.password,
        rememberMe:Boolean(values.rememberMe)
      })
      const token = data.token;
      if (token) {
        setToken(token);
      }
      const roles = data.roles
      
      if(isSuccess&& roles.includes("admin")) {
        navigate("/")
      }
      else{
        console.log("شما به رول ادمین دسترسی ندارید")
      }

    }catch (error) {
      console.error("login failed:", error);
    }
    
  };

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1 h2 d-flex justify-content-end">
              <strong>👋 !خوش آمدید</strong>
            </CardTitle>
            <CardText className="mb-2 d-flex justify-content-end">
              برای ورود ایمیل و پسورد خود را وارد کنید
            </CardText>
            <Formik
              initialValues={{
                phoneOrGmail: "",
                password: "",
                rememberMe:true
              }}
              onSubmit={onFormSubmit}
              validationSchema={validationSchema}
              style={{ direction: "rtl" }}
            >
              <Form className="auth-login-form mt-2 ">
                <div className="mb-1 d-flex flex-column">
                  <Label className="form-label d-flex justify-content-end" for="phoneOrGmail">
                    ایمیل
                  </Label>
                  <Field
                    type="email"
                    name="phoneOrGmail"
                    className="form-label p-1 d-flex justify-content-end"
                    id="phoneOrGmail"
                  />
                  <ErrorMessage
                    name="phoneOrGmail"
                    className="text-danger text-end fs-6 d-flex justify-content-end"
                    component={"span"}
                  />
                </div>
                <div className="mb-1 d-flex flex-column ">
                  <Label className="form-label d-flex justify-content-end" for="password">
                    پسورد
                  </Label>
                  <Field
                    type="password"
                    name="password"
                    className="form-label p-1"
                  />
                  <ErrorMessage
                    name="password"
                    className="text-danger text-end fs-6"
                    component={"span"}
                  />
                </div>
                <Button type="submit" className="w-100">ورود</Button>
              </Form>
            </Formik>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
