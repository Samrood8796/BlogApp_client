import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from '../../utils/axios'
import { setLogin } from '../../state/useReducer'
import toast, { Toaster } from 'react-hot-toast';
import { googleLogin, loginPost } from '../../utils/constants'
import { GoogleLogin } from '@react-oauth/google'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userNameOrEmail, setUserNameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post(loginPost, { userNameOrEmail, password }, {
            headers: { "Content-Type": "application/json" },
        }).then((userData) => {
            dispatch(setLogin(userData.data))
            navigate('/')
        }).catch((err) => {
            ((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        })
    }
    const responseMessage = (response) => {
        setUser(response.credential)
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    useEffect(() => {
        if (user) {
            const getUser =async ()=>{
                const response = await axios.get(googleLogin,{
                    headers: {
                        "Authorization": `barear ${user}`
                    }
                })
                dispatch(setLogin(response.data))
                navigate('/')
            }
            getUser();
        }
    }, [user,dispatch,navigate])

    return (
        <div className="flex min-h-screen bg-[#8d76ff] items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">Blog App</h2>
          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="user-name-or-mail" className="sr-only">
                  User Name
                </label>
                <input
                  onChange={(e) => setUserNameOrEmail(e.target.value)}
                  id="user-name-or-mail"
                  name="userNameOrEmail"
                  type="text"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8d76ff] focus:border-[#8d76ff] placeholder-gray-400 text-gray-800 focus:outline-none"
                  placeholder="Enter userName Or Email Address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8d76ff] focus:border-[#8d76ff] placeholder-gray-400 text-gray-800 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>
      
            <div className="flex justify-between items-center">
              <Link to="/register" className="text-[#8d76ff] hover:underline">
                Create New Account
              </Link>
              <p
                onClick={() => navigate("/forgottPassword")}
                className="cursor-pointer hover:underline"
              >
                Forgot Your Password?
              </p>
            </div>
            
            <div className="w-full">
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
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
      
    )
}
export default Login