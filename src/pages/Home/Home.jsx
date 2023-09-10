import React, { useState } from 'react'
import Navbar from '../../componants/Navbar/Navbar'
import LeftBar from '../../componants/LeftBar/LeftBar'
import Feed from '../../componants/Feed/Feed'
import MyPostWidget from '../../componants/widgets/MyPostWidget'
const Home = () => {
  const [createPostModal, setCreatePostModal] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen}/>
      <div className='flex bg-[#8d76ff]'>
        <LeftBar isOpen={isOpen} setCreatePostModal={setCreatePostModal}/>
        <div className='bg-[#cfc6ff] w-full p-10'>
          <Feed />
        </div>
        {createPostModal ? (
          <MyPostWidget setCreatePostModal={setCreatePostModal}/>
        ) : null}
      </div>
    </>
  )
}

export default Home