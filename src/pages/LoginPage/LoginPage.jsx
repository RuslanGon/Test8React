import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MIN_CHAR_NAME_VALIDATION } from "../../utils/constans";
import { useDispatch } from "react-redux";
import { apiLogin } from "../../redux/auth/authSlice";

const FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

const loginUsersSchema = Yup.object({
  email: Yup.string()
    .email("You must enter valid email adress!")
    .required("User email is reguired"),
  password: Yup.string()
    .required("password is reguired")
    .min(
      MIN_CHAR_NAME_VALIDATION,
      `Your password must be greate than ${MIN_CHAR_NAME_VALIDATION} sumbal`
    ),
});

const LoginPage = () => {
const dispatch = useDispatch()

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(apiLogin(values))
    actions.resetForm();
    
  };

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={loginUsersSchema}
    >
      <Form>
        <h2>Login users</h2>
        <label>
          <span>Email</span>
          <br />
          <Field type="email" name="email" placeholder="@email" />
          <ErrorMessage component="p" name="email" />
        </label>
        <br />
        <label>
          <span>Password</span>
          <br />
          <Field type="password" name="password" placeholder='enter your password' />
          <ErrorMessage component="p" name="password" />
        </label>
        <br />
        <button type="submit"> ▶ Create new users</button>
      </Form>
    </Formik>
  );
};

export default LoginPage;
