import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
// import { apiRegister } from "../../redux/auth/authSlice";
import { apiNewContact } from "../../redux/contacts/contactsSlice";

const FORM_INITIAL_VALUES = {
  name: "",
  number: "",
};

const addNewContactSchema = Yup.object({
  name: Yup.string()
    .required("name is reguired"),
  number: Yup.string()
    .required("number is reguired")
});

const NewContact = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
      console.log(values);
      dispatch(apiNewContact(values));
      actions.resetForm();
    };
  
    return (
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        onSubmit={handleSubmit}
        validationSchema={addNewContactSchema}
      >
        <Form>
          <h2>Add new contact</h2>
          <label>
            <span>name</span>
            <br />
            <Field type="text" name="name" placeholder="name" />
            <ErrorMessage component="p" name="name" />
          </label>
          <br />
          <label>
            <span>number</span>
            <br />
            <Field type="text" name="number" placeholder='number' required />
            <ErrorMessage component="p" name="number"  />
          </label>
          <br />
          <button type="submit"> ▶ Add new user</button>
        </Form>
      </Formik>
    );
}

export default NewContact