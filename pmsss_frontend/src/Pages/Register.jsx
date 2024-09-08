import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BACKEND_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import registerPage from '../../public/registerPage.png';

function Register() {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      college: "",
      password: "",
      account_number: "",
      ifsc: "",
      father_name: "",
      income: "",
      class10_percent: "",
      class12_percent: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      college: Yup.string().required("College is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      account_number: Yup.string().required("Account number is required"),
      ifsc: Yup.string().required("IFSC is required"),
      father_name: Yup.string().required("Father's name is required"),
      income: Yup.number().required("Income is required"),
      class10_percent: Yup.number().required("Class 10 percentage is required"),
      class12_percent: Yup.number().required("Class 12 percentage is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${BACKEND_URL}/student/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        setResponseMessage(data.message);
        if (data.success) {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      } catch (error) {
        setResponseMessage(
          "An error occurred. Please try again.",
          error.message
        );
      }
    },
  });

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden md:flex md:w-1/2 justify-center items-center">
            <img
              src={registerPage}
              alt="Register Page"
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Student Registration
            </h2>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="college"
                    className="block text-sm font-medium text-gray-700"
                  >
                    College
                  </label>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.college}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.college && formik.errors.college ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.college}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="account_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Account Number
                  </label>
                  <input
                    id="account_number"
                    name="account_number"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.account_number}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.account_number &&
                  formik.errors.account_number ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.account_number}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="ifsc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    IFSC
                  </label>
                  <input
                    id="ifsc"
                    name="ifsc"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.ifsc}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.ifsc && formik.errors.ifsc ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.ifsc}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="father_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Father&apos;s Name
                  </label>
                  <input
                    id="father_name"
                    name="father_name"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.father_name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.father_name && formik.errors.father_name ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.father_name}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="income"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Income
                  </label>
                  <input
                    id="income"
                    name="income"
                    type="number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.income}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.income && formik.errors.income ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.income}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="class10_percent"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Class 10 Percentage
                  </label>
                  <input
                    id="class10_percent"
                    name="class10_percent"
                    type="number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.class10_percent}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.class10_percent &&
                  formik.errors.class10_percent ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.class10_percent}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="class12_percent"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Class 12 Percentage
                  </label>
                  <input
                    id="class12_percent"
                    name="class12_percent"
                    type="number"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.class12_percent}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.class12_percent &&
                  formik.errors.class12_percent ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.class12_percent}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </div>
            </form>
            {responseMessage && (
              <div className="mt-4 text-center text-gray-700">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;