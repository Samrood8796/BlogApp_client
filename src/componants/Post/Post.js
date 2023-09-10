import React from 'react'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { CommentIcon, HeartIcon, MenuIcon, WarningIcon, } from '../../icons/icons'
import axios from '../../utils/axios'
import { deletePost } from '../../utils/constants'
import EditPost from '../EditPost/EditPost'
import Comments from '../comments/comments'
import { setDeletePost } from '../../state/useReducer'
import { likePost } from '../../utils/apiCalls'
import { ConfirmToast } from 'react-confirm-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

const Post = (props) => {
    const timeAgo = new TimeAgo('en-US')
    const {
        postId,
        desc,
        author,
        image,
        likes,
        comments,
        render,
        forceRender,
        explanation,
        createdAt } = props;

    const [showComment, setShowComment] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [editPostModal, setEditPostModal] = useState(false)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const userLiked = likes && likes[user._id];
    const likeCount = Object.keys(likes).length
    const PatchLike = () => {
        likePost(token, postId, dispatch)
    }


    const HandleShowComment = () => {
        setShowComment(!showComment)
    }

    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`${deletePost}/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const id = response.data.id
            dispatch(setDeletePost({ id: id }))

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='mt-6 shadow-md  '>
            <div className='bg-white rounded-lg'>
                <div className='p-2'>
                    <div className='justify-between p-4 border-b-2 flex'>
                        <div className=' flex '>
                            {author?.profilePic ?
                                <img className='w-10 rounded-full h-10' src={author?.profilePic} alt='' /> :
                                <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
                                    <FaUser className='w-full h-full rounded-full' />
                                </div>
                            }
                            <div>
                                <p className='pl-4 font-bold'>{author?.userName}</p>
                                <p className='pl-2 text-sm'>{timeAgo.format(new Date(createdAt))}</p>
                            </div>
                        </div>
                        {user?._id === author?._id &&
                            <div className='relative'>
                                <div className='block w-10 h-10 cursor-pointer'>
                                    <ConfirmToast
                                        asModal={true}
                                        customCancel={"Cancel"}
                                        customConfirm={"Confirm"}
                                        customFunction={handleDeletePost}
                                        message={"Do you want to delete post?"}
                                        position={"bottom-left"}
                                        showCloseIcon={true}
                                    >
                                        <p className='text-3xl'>
                                            <AiFillDelete />
                                        </p>
                                    </ConfirmToast>
                                </div>

                            </div>
                        }

                    </div>
                    <p className='bg-white p-5 '>
                        {desc}
                    </p>
                    <div className='flex justify-center ' onClick={() => setShowMenu(false)}>
                        <img className='rounded-md' src={image} alt='' />
                    </div>
                    <p className='bg-white p-5 '>
                        <div dangerouslySetInnerHTML={{ __html: explanation }} />
                    </p>
                </div>

                <div className='flex'>
                    <div className='flex'>
                        {/* like section   */}
                        <div className='flex p-4'>
                            <div className='cursor-pointer' onClick={PatchLike}>
                                <HeartIcon liked={userLiked} />
                            </div>
                            <p>{likeCount} likes</p>
                        </div>
                        <div className='flex p-4'>
                            <div className='cursor-pointer' onClick={HandleShowComment}>
                                <CommentIcon />
                            </div>
                            <p className='px-1 '>{comments?.length}</p>
                        </div>
                    </div>
                    {/* <div className='ml-auto mr-5 pt-4'>
                        <ShareIcon />
                    </div> */}
                </div>
                {showComment && <Comments render={render} forceRender={forceRender} comments={comments} postId={postId} />}
            </div>
        </div>
    )
}

export default Post