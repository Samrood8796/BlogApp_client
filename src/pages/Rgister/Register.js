import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../utils/axios'
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from 'yup'
import { signupPost } from "../../utils/constants";

const initialValues = {
    email: '',
    userName: '',
    phoneNumber: '',
    password: '',
    confirm_password: ''
}
const Register = () => {
    const navigate = useNavigate()
    const SignUpSchema = yup.object({
        email: yup.string().email().required("Email Required"),
        name: yup.string().min(2).max(20).required('please enter your Actual Name '),
        userName: yup.string().min(4).max(20).required('please enter your username '),
        phoneNumber: yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
        password: yup.string().min(4).required('please Enter password'),
        confirm_password: yup.string().required().oneOf([yup.ref("password"), null], 'password must match')
    })

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values, action) => {
           
            handleSignUp(values)
            action.resetForm()
        }
    })
    let handleSignUp = (user) => {
        axios.post(signupPost, user).then((response) => {
          console.log(response);
            if(response.data){
                navigate(`/login`)
            }
        }).catch((err) => {
            ((error) => {
                toast.error(error.response.data.error || 'error occured', {
                    position: "top-center",
                });
            })(err);
        })
    }
    return (
        <div className="flex bg-[#8d76ff] min-h-screen justify-center items-center py-14 sm:px-6 lg:px-8">
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">Sign Up to Blog App</h2>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div>
          <input
            onChange={handleChange}
            onClick={handleBlur}
            value={values.name}
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#02abc5] focus:border-[#02abc5] placeholder-gray-400 text-gray-800 focus:outline-none"
            placeholder="Name"
          />
          {errors.name && touched.name ? (
            <p className="text-red-600">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <input
            onChange={handleChange}
            onClick={handleBlur}
            value={values.userName}
            id="userName"
            name="userName"
            type="text"
            autoComplete="off"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#02abc5] focus:border-[#02abc5] placeholder-gray-400 text-gray-800 focus:outline-none"
            placeholder="User Name"
          />
          {errors.userName && touched.userName ? (
            <p className="text-red-600">{errors.userName}</p>
          ) : null}
        </div>
        <div>
          <input
            onChange={handleChange}
            onClick={handleBlur}
            value={values.email}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#02abc5] focus:border-[#02abc5] placeholder-gray-400 text-gray-800 focus:outline-none"
            placeholder="Email"
          />
          {errors.email && touched.email ? (
            <p className="text-red-600">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <input
            onChange={handleChange}
            onClick={handleBlur}
            value={values.phoneNumber}
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            autoComplete="off"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#02abc5] focus:border-[#02abc5] placeholder-gray-400 text-gray-800 focus:outline-none"
            placeholder="Phone Number"
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <p className="text-red-600">{errors.phoneNumber}</p>
          ) : null}
        </div>
        <div>
          <input
            onChange={handleChange}
            onClick={handleBlur}
            value={values.password}
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#02abc5] focus:border-[#02abc5] placeholder-gray-400 text-gray-800 focus:outline-none"
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <p className="text-red-600">{errors.password}</p>
          ) : null}
        </div>
        <div>
          <input
            onChange={handleChange}
            onClick={handleBlur}
            value={values.confirm_password}
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="off"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#02abc5] focus:border-[#02abc5] placeholder-gray-400 text-gray-800 focus:outline-none"
            placeholder="Confirm Password"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <p className="text-red-600">{errors.confirm_password}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          Already have an account ?{" "}
          <Link to="/login" className="text-[#02abc5] hover:underline">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <button
          type="submit"
          className="w-full py-2 bg-[#8d76ff] text-white font-semibold rounded-md hover:bg-[#7155ff] focus:outline-none focus:ring-2 focus:ring-[#02abc5]"
        >
          Sign Up
        </button>
        <Toaster />
      </div>
    </form>
  </div>
</div>


    )
}

export default Register;