// give error if the title or desc were missing

// npm install formik yup
// # OR
// yarn add formik yup
// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const TodoForm = () => {
//   const initialValues = {
//     title: "",
//     description: "",
//     checked: false,
//   };

//   const validationSchema = Yup.object().shape({
//     title: Yup.string().required("Title is required"),
//     description: Yup.string().required("Description is required"),
//   });

//   const handleSubmit = (values) => {
//     // Handle form submission
//     console.log(values);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       <Form>
//         <Field type="text" name="title" placeholder="Title" />
//         <ErrorMessage name="title" component="div" />

//         <Field type="text" name="description" placeholder="Description" />
//         <ErrorMessage name="description" component="div" />

//         <button type="submit">Add Todo</button>
//       </Form>
//     </Formik>
//   );
// };

// export default TodoForm;
