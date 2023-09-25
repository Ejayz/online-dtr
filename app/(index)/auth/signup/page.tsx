"use client";
import InputWithError from "@/app/components/InputWithError";
import { Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";

export default function Home() {
  const [processing, setProcessing] = useState(false);
  const signup_validation_schema = object({
    email: string().email().required("Email is required"),
    password: string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    username: string().required("Username is required"),
    student_name: string().required("Student name is required"),
    school: string().required("School is required"),
    address: string().required("School Address is required"),
    company: string().required("Company name is required"),
    company_address: string().required("Company address is required"),
    supervisor_name: string().required("Supervisor name is required"),
  });

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 text-base-content">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up!</h1>
            <p className="py-6"></p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                username: "",
                student_name: "",
                school: "",
                address: "",
                company: "",
                company_address: "",
                supervisor_name: "",
              }}
              validationSchema={signup_validation_schema}
              onSubmit={async (values) => {
                setProcessing(true);
                let headersList = {
                  Accept: "*/*",
                  "User-Agent":
                    "Thunder Client (https://www.thunderclient.com)",
                  "Content-Type": "application/json",
                };

                let bodyContent = JSON.stringify({
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                  username: values.username,
                  student_name: values.student_name,
                  school: values.school,
                  address: values.address,
                  company: values.company,
                  company_address: values.company_address,
                  supervisor_name: values.supervisor_name,
                });

                let response = await fetch("/api/post/signup/", {
                  method: "POST",
                  body: bodyContent,
                  headers: headersList,
                });
                let data = await response.json();
                if (data.code == 200) {
                  setProcessing(false);
                  toast.success(data.message);
                  window.location.href = "/auth/login";
                } else {
                  setProcessing(false);
                  toast.error(data.message);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="card-body">
                  <InputWithError
                    componentName="email"
                    componentType="email"
                    placeHolder="Email"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.email}
                    touched={touched.email}
                  />
                  <InputWithError
                    componentName="password"
                    componentType="password"
                    placeHolder="Password"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.password}
                    touched={touched.password}
                  />
                  <InputWithError
                    componentName="confirmPassword"
                    componentType="password"
                    placeHolder="Confirm Password"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                  <InputWithError
                    componentName="username"
                    componentType="text"
                    placeHolder="Username"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.username}
                    touched={touched.username}
                  />
                  <InputWithError
                    componentName="student_name"
                    componentType="text"
                    placeHolder="Student Name"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.student_name}
                    touched={touched.student_name}
                  />
                  <InputWithError
                    componentName="school"
                    componentType="text"
                    placeHolder="School"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.school}
                    touched={touched.school}
                  />
                  <InputWithError
                    componentName="address"
                    componentType="text"
                    placeHolder="Address"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.address}
                    touched={touched.address}
                  />
                  <InputWithError
                    componentName="company"
                    componentType="text"
                    placeHolder="Company Name"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.company}
                    touched={touched.company}
                  />
                  <InputWithError
                    componentName="company_address"
                    componentType="text"
                    placeHolder="Company Address"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.company_address}
                    touched={touched.company_address}
                  />
                  <InputWithError
                    componentName="supervisor_name"
                    componentType="text"
                    placeHolder="Supervisor Name"
                    componentClassName="input input-bordered"
                    classes="text-base-content"
                    errors={errors.supervisor_name}
                    touched={touched.supervisor_name}
                  />
                  <div className="form-control mt-6">
                    <button
                      className={`btn ${
                        processing ? "btn-disabled" : "btn-primary"
                      }`}
                    >
                      {processing ? (
                        <>
                          <div className="loading-spinner"></div>
                          <span>Sign Up</span>
                        </>
                      ) : (
                        <span>Sign Up</span>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
