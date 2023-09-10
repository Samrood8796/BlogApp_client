import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../utils/constants'
import toast, { Toaster } from 'react-hot-toast'
import axios from '../../utils/axios'
const ResetPassword = () => {
    const location = useLocation()
    const code = location.search.split('?')[1]
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const handlePassword = (e) => {
        e.preventDefault()
        if (password) {

            axios.put(`${resetPassword}?${code}`, { password: password, }).then((response) => {
                toast.success(response.data.msg)
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }).catch((err) => {
                toast.error(err.response.data.msg)
            })
        }
    }

    return (

        <>

            <div className="flex min-h-screen bg-[#8d76ff] items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">Blog App</h2>
                    <form className="space-y-6" onSubmit={(e) => handlePassword(e)}>
                        <div className="space-y-4">
                            <div>
                                <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required className=" pl-3 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 sm:text-sm " placeholder="Enter new password" />
                            </div>
                         
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-[#8d76ff] text-white font-semibold rounded-md hover:bg-[#6a4cc3] focus:outline-none focus:ring-2 focus:ring-[#8d76ff]"
                            >
                                Sign in
                            </button>
                            <Toaster />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword