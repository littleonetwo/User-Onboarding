import React, { useState, useEffect } from "react";

import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";



const UserForm = ({ values, touched, errors, users, setUsers, status }) => {
  // console.log(values);
  // const [users, setUsers] = useState([]);
  //
  // console.log("this is touched", touched);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  return (
    <div className="user-form">
      <Form>
        {/* name */}
        <label>Name:

          <Field
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
          />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </label>

        {/* email */}
        <label>Email:

          <Field
            type="text"
            name="email"
            placeholder="email@email.com"
            value={values.email}
          />
          {touched.email && errors.email && <p>{errors.email}</p>}
        </label>

        {/* password */}
        <label>Password:

          <Field
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
          />

          {touched.password && errors.password && <p>{errors.password}</p>}
        </label>

        {/* Terms of Service */}
        <label>
          Do you agree to our Terms of Service?
          <Field
            type="checkbox"
            name="tos"
            placeholder="ToS"
            checked={values.tos}
          />

          {touched.tos && errors.tos && <p>{errors.tos}</p>}
        </label>


        {/* submission */}
        <button type="submit">Submit</button>
      </Form>
      <div>
        {users.map(id => (
          <ul key={id.id}>
            <li>ID#: {id.id}</li>
            <li>Name: {id.name}</li>
            <li>Email: {id.email}</li>
            <li>Password: {id.password}</li>

          </ul>
        ))}
      </div>
    </div>

  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, tos}) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false

    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is not a valid Email address").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    tos: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')

  }),

  handleSubmit(values, {setStatus}) {
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
})(UserForm);

export default FormikUserForm;
