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
    password: string().required("Password is required"),
  });

  return (
    <div className=" bg-white w-screen flex text-base-content font-monst flex-row h-screen">
      <div className="w-1/2 h-full flex flex-col">
        <div className="w-3/4 mx-auto my-auto ">
          <h1 className=" text-4xl mx-auto text-center">Log In</h1>
          <h4 className=" text-base mx-auto text-center">
            To use our service please log in with your account details.
          </h4>
          <Formik
            initialValues={{
              email: "",
              password: "",
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
                <div className="flex flex-col">
                  <InputWithError
                    componentName="email"
                    componentType="email"
                    placeHolder="Email"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.email}
                    touched={touched.email}
                    additionalStyle=""
                  />
                  <InputWithError
                    componentName="password"
                    componentType="password"
                    placeHolder="Password"
                    componentClassName="input "
                    classes="text-base-content"
                    errors={errors.password}
                    touched={touched.password}
                    additionalStyle=""
                  />
                </div>
                <div className="form-control mt-6">
                  <Link href="/auth/forgotpassword">Forgot Password?</Link>
                </div>
                <div className="form-control mt-6">
                  <button
                    className={`btn ${
                      processing ? "btn-disabled" : "btn-primary"
                    }`}
                  >
                    {processing ? (
                      <>
                        <span>Authenticating </span>
                        <span className="loading loading-dots loading-sm"></span>
                      </>
                    ) : (
                      <span>Log In</span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="w-1/2 h-full flex flex-col text-center">
        <div className="my-auto flex flex-col">
          <h1 className=" font-monst  text-4xl my-2 font-bold ">
            Get Started !
          </h1>
          <h3 className="font-monst text-2xl my-4 text-base-content">
            Make DTR recording and calculation easier.
          </h3>
          <Link
            className="btn my-6 btn-primary w-1/4 mx-auto"
            href={"/auth/signup"}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
