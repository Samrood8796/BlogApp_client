import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from "../../utils/axios"
import { forgotPassword } from '../../utils/constants'
const ForgottPassword = () => {
    const [email, setEmail] = useState(null)
    const navigate = useNavigate()
    const handleEmail = (e) => {
        e.preventDefault()
        if (email) {
            axios.post(forgotPassword, { email: email }).then((response) => {
                toast.success(response.data.msg)
                navigate('/success')
            }).catch((err) => {
                toast.error(err.response.data.msg)
            })
        }
    }
    return (
        <>

            <div className="flex min-h-screen bg-[#8d76ff] items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">Enter Your Email Address</h2>
                    <form className="space-y-6" onSubmit={(e) =>handleEmail(e)}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">Enter your email</label>
                                <input onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" required className=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="Enter eamil adress" />
                            </div>
                           
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#8d76ff] text-white font-semibold rounded-md hover:bg-[#6a4cc3] focus:outline-none focus:ring-2 focus:ring-[#8d76ff]"
                            >
                                Submit
                            </button>
                            <Toaster />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgottPassword