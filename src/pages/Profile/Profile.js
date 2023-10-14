import React, { useEffect, useState } from 'react'
import Navbar from '../../componants/Navbar/Navbar'
import LeftBar from '../../componants/LeftBar/LeftBar'
import Feed from '../../componants/Feed/Feed'
import MyPostWidget from '../../componants/widgets/MyPostWidget'
import UserDetails from '../../componants/UserDetails/UserDetails'
import { useParams } from 'react-router-dom'
import axios from '../../utils/axios'
import { fetchMypost, getAPI } from '../../utils/apiCalls'
import { useSelector } from 'react-redux'
const Profile = () => {
  const token = useSelector((state) => state.token)
  const [createPostModal, setCreatePostModal] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [render, forceRender] = useState(false)
  const { id } = useParams()
  const [userData, setUserData] = useState([])
  const [profilePosts, setProfilePosts] = useState([])
  const fetchUserDetails = (userId) => {
    axios.get(`/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setUserData(response.data)
    })
  }
  useEffect(() => {
    fetchUserDetails(id)
  }, [id, forceRender])

  const fetchMypost = async () => {
    const {data} = await getAPI(`post/${id}/posts`,token)
     console.log("my---data", data);
    setProfilePosts(data)
  }
  useEffect(() => {
    fetchMypost()
   
  }, [render])

  return (
    <>
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className='flex bg-[#8d76ff]'>
        <LeftBar isOpen={isOpen} setCreatePostModal={setCreatePostModal} />
        <div className='bg-[#cfc6ff] w-full p-10'>
          <UserDetails userData={userData} forceRender={forceRender} setForceRender={forceRender} />
          <Feed isMypost={true} profileposts={profilePosts} render={render} forceRender={forceRender}  />
        </div>
        {createPostModal ? (
          <MyPostWidget setCreatePostModal={setCreatePostModal} />
        ) : null}
      </div>
    </>
  )
}

export default Profile