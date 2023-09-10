import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { setLogout } from '../../state/useReducer'
import { useDispatch, useSelector } from 'react-redux'
import UserDetails from '../UserDetails/UserDetails'

const LeftBar = ({ setCreatePostModal, isOpen }) => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    return (
        <>
            <div className={`flex h-screen text-white transform transition-transform duration-300 ease-out ${isOpen ? 'w-72 translate-x-0' : '-translate-x-72 w-0'}`}>
                <div className="p-10 h-screen text-white w-72">
                    <div className="flex items-center p-2 rounded-xl border">
                        <p className="text-xl pr-2">
                            <AiOutlinePlus />
                        </p>
                        <p onClick={() => setCreatePostModal(true)} className="font-serif text-xl">New Post</p>
                    </div>
                    <br />
                    <hr className="border-t border-gray-600 my-3" />
                    <div className="pt-3">
                        <div>
                            <Link to='/'>
                                <p className="py-2 pl-4 pr-2 font-serif bg-white text-xl text-black rounded-l-xl">
                                    Posts
                                </p>
                            </Link>

                            <Link to={`/profile/${user._id}`}>
                                <p className="my-2 py-2 pl-4 font-serif pr-2 bg-white text-md text-black rounded-l-xl">
                                    My Profile
                                </p>
                            </Link>
                            {/* <Link to='/profile/12345'> */}
                                <p onClick={()=>dispatch(setLogout())} className="my-2 py-2 pl-4 font-serif pr-2 bg-white text-md text-black rounded-l-xl">
                                    Logout
                                </p>
                            {/* </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftBar