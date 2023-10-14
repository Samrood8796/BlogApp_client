import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BellIcon, SearchIcon } from '../../icons/icons'
import { getAllusers } from '../../utils/apiCalls'
import { setLogout } from '../../state/useReducer'
import {AiOutlineMenu} from 'react-icons/ai'
const Navbar = ({setIsOpen, isOpen}) => {
    const userData = useSelector((state) => state.user)
    const [searchitem, setSearchItem] = useState("")

    const handleSearch = (e) => {
        setSearchItem(e.target.value)
    }
    const navigate = useNavigate()
    return (
        <>
            <nav className="sticky top-0 z-20 w-full bg-[#8d76ff] flex justify-between h-[64px] items-center px-5 shadow-md">
                <div className=" flex items-center space-x-5">
                <p className='cursor-pointer text-2xl px-2' onClick={()=>setIsOpen(!isOpen)}>
                    <AiOutlineMenu/>
                </p>
                    <h1 className="hidden md:block text-3xl text-white italic">Blog App</h1>
                </div>
                <div className=' relative border rounded flex item-center w-5/6 md:w-2/4 md:space-x-5'>
                    <input onChange={handleSearch} value={searchitem} className='w-full focus:outline-none py-2 px-5 text-gray ' type='text' placeholder='Search......' />
                    
                    <div className='px-3 cursor-pointer py-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
              
                {userData && (
                    <p className="px-3 py-3 text-white rounded-md text-sm font-bold">{userData?.userName}</p>
                )}
               
                    {userData?.profilePic ? (
                        <button onClick={() => navigate(`/profile/${userData._id}`)} className="hidden md:block w-12 h-12">
                            <img className="rounded-full h-full w-full" src={userData?.profilePic} alt={userData?.userName} />
                        </button>
                    ) : (
                        <div className="hidden md:block border bg-white border-[#fffff] w-10 h-10 rounded-full">
                            <FaUser className="w-full h-full rounded-full" />
                        </div>
                    )}
                  
            </nav>
        </>
    )
}

export default Navbar