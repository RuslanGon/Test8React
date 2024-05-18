import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  MAX_CHAR_NAME_VALIDATION,
  MIN_CHAR_NAME_VALIDATION,
} from "../../utils/constans";
import { useDispatch } from "react-redux";
import { apiRegister } from "../../redux/auth/authSlice";

const FORM_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
};

const registerUsersSchema = Yup.object({
  name: Yup.string()
    .required("name is reguired")
    .max(
      MAX_CHAR_NAME_VALIDATION,
      `Your user name must be less than ${MAX_CHAR_NAME_VALIDATION} sumbal`
    ),
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

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(apiRegister(values));
    // onAddUsers(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={registerUsersSchema}
    >
      <Form>
        <h2>Registor users</h2>
        <label>
          <span>Email</span>
          <br />
          <Field type="email" name="email" placeholder="@email" />
          <ErrorMessage component="p" name="email" />
        </label>
        <br />
        <label>
          <span>Name</span>
          <br />
          <Field type="text" name="name" placeholder="name" required />
          <ErrorMessage component="p" name="name" />
        </label>
        <br />
        <label>
          <span>Password</span>
          <br />
          <Field
            type="password"
            name="password"
            placeholder="enter your password"
          />
          <ErrorMessage component="p" name="password" />
        </label>
        <br />
        <button type="submit"> ▶ Create new users</button>
      </Form>
    </Formik>
  );
};

export default RegistrationPage;
