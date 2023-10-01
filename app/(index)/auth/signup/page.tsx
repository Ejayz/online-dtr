"use client";
import InputWithError from "@/app/components/InputWithError";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";
import { Montserrat } from "next/font/google";

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
    <div className=" bg-white w-screen flex text-base-content font-monst flex-row h-screen">
      <div className="w-1/2 h-full flex flex-col text-center">
        <div className="my-auto flex flex-col">
          <h1 className=" font-monst  text-4xl my-2 font-bold ">
            Welcome Back !
          </h1>
          <h3 className="font-monst text-2xl my-4 text-base-content">
            Ey ! Time to record some time . Please login with your account
            details
          </h3>
          <Link
            className="btn my-6 btn-primary w-1/4 mx-auto"
            href={"/auth/login"}
          >
            Log In
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col">
        <div className="w-3/4 mx-auto my-auto ">
          <h1 className=" text-4xl mx-auto text-center">Create Account</h1>
          <h4 className=" text-base mx-auto text-center">
            You must create an account to use our service
          </h4>
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
            onSubmit={async (values, { resetForm }) => {
              setProcessing(true);
              let headersList = {
                Accept: "*/*",
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
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
                resetForm();
              } else {
                setProcessing(false);
                toast.error(data.message);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="card-body">
                <div className="flex flex-row">
                  <InputWithError
                    componentName="email"
                    componentType="email"
                    placeHolder="Email"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.email}
                    touched={touched.email}
                    additionalStyle=" mr-2 w-1/2"
                  />
                  <InputWithError
                    componentName="username"
                    componentType="text"
                    placeHolder="Username"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.username}
                    touched={touched.username}
                    additionalStyle=" w-1/2 ml-2"
                  />
                </div>
                <div className="flex flex-row">
                  <InputWithError
                    componentName="password"
                    componentType="password"
                    placeHolder="Password"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.password}
                    touched={touched.password}
                    additionalStyle="w-1/2 mr-2"
                  />
                  <InputWithError
                    componentName="confirmPassword"
                    componentType="password"
                    placeHolder="Confirm Password"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    additionalStyle="w-1/2 "
                  />
                </div>

                <InputWithError
                  componentName="student_name"
                  componentType="text"
                  placeHolder="Student Name"
                  componentClassName="input "
                  classes="text-base-content"
                  errors={errors.student_name}
                  touched={touched.student_name}
                  additionalStyle=""
                />
                <div className="flex flex-row">
                  <InputWithError
                    componentName="school"
                    componentType="text"
                    placeHolder="School"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.school}
                    touched={touched.school}
                    additionalStyle=" mr-2 w-1/2"
                  />
                  <InputWithError
                    componentName="address"
                    componentType="text"
                    placeHolder="School Address"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.address}
                    touched={touched.address}
                    additionalStyle=" ml-2 w-1/2"
                  />
                </div>
                <div className=" flex flex-row">
                  <InputWithError
                    componentName="company"
                    componentType="text"
                    placeHolder="Company Name"
                    componentClassName="input"
                    classes="text-base-content"
                    errors={errors.company}
                    touched={touched.company}
                    additionalStyle=" mr-2 w-1/2"
                  />
                  <InputWithError
                    componentName="company_address"
                    componentType="text"
                    placeHolder="Company Address"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.company_address}
                    touched={touched.company_address}
                    additionalStyle=" ml-2 w-1/2"
                  />
                </div>
                <InputWithError
                  componentName="supervisor_name"
                  componentType="text"
                  placeHolder="Supervisor Name"
                  componentClassName="input "
                  classes="text-base-content"
                  errors={errors.supervisor_name}
                  touched={touched.supervisor_name}
                  additionalStyle=""
                />
                <div className="form-control mt-6">
                  <button
                    className={`btn ${
                      processing ? "btn-disabled" : "btn-primary"
                    }`}
                  >
                    {processing ? (
                      <>
                        <span>Please wait </span>
                        <span className="loading loading-dots loading-sm"></span>
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
  );
}
