import instance from "../../../interseptor/Interseptor";

export const LoginApi = async ({ phoneOrGmail, password, rememberMe }) => {
  const response = await instance.post("/Sign/Login", {
    phoneOrGmail,
    password,
    rememberMe,
  });
  return response.data;
};
