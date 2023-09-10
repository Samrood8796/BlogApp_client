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
    const token = useSelector((state) => state.token)
    const [searchitem, setSearchItem] = useState("")
    let [allUsers, setAllusers] = useState([])
    let [filterUsers, setFilterUsers] = useState([])
    const allusers = async () => {
        const users = await getAllusers(token)
        setAllusers(users)
    }
    useEffect(() => {
        allusers()
    }, [])
    const handleSearch = (e) => {
        setSearchItem(e.target.value)
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [isOpen, setIsOpen] = useState(false);

    // const toggleMenu = () => {
    //     setIsOpen(!isOpen);
    // }

    const handleLogout = () => {
        dispatch(setLogout())
        navigate('/login')
    }

    useEffect(() => {
        const users = allUsers.filter((user) => {
            return user?.userName?.toLowerCase().includes(searchitem) && user._id !== userData._id
        })
        setFilterUsers(users)
    }, [searchitem])
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
                    <ul className="absolute z-100 top-10 bottom-0 right-0  w-full rounded-md shadow-md mt-1 divide-y divide-gray-200">
                        {filterUsers.length > 0 && searchitem !== "" ? filterUsers.map((user) => (
                            <li key={user._id} className="bg-white cursor-pointer flex">
                                <div className='border p-1 flex w-full hover:bg-gray-100'>
                                    {user.profilePic ?
                                        <img className=' w-10 h-10 rounded-full' src={user.profilePic} /> :
                                        <div className='block border-zinc-400 border w-10 h-10 rounded-full'>
                                            <FaUser className='w-full h-full rounded-full' />
                                        </div>
                                    }
                                    <Link to={`/othersprofile/${user._id}`}>
                                        <div className='px-2'>
                                            <p>{user.userName}</p>
                                            <p className='-mt-1'>{user.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            </li>
                        )) : ""}
                    </ul>
                    <div className='px-3 cursor-pointer py-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
                {/* <div className="flex items-center">
                    <div className="px-4">
                        <BellIcon />
                    </div>
                </div> */}
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