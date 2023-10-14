import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state/useReducer'
import { getPosts } from '../../utils/constants'
import Post from '../Post/Post'
import { AiOutlineFileImage } from 'react-icons/ai'
import Loader from '../Loader/Loader'
const Feed = ({ isMypost, render, forceRender, profileposts, profileId }) => {
    console.log("=======", profileposts);
    let posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    const user = useSelector((state) => state.user) 
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchPosts = async () => {
        setLoading(true)
        const response = await axios.get(getPosts, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        const postData = response.data;
        dispatch(setPosts({ posts: postData }))
        setLoading(false)
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    if (loading) return <Loader textContent={"loading......"}/>
    if (!posts) return null
    if (isMypost) {
        return (
            <>
                {profileposts?.length < 1 ? <div className='bg-white mt-2 rounded p-28 text-3xl font-semibold'>No Posts Found!!</div> :

                   profileposts?.map(({
                        _id,
                        content,
                        author,
                        image,
                        likes,
                        comments,
                        createdAt }) => (
                        <Post
                            render={render}
                            forceRender={forceRender}
                            key={_id}
                            postId={_id}
                            desc={content}
                            author={author}
                            image={image}
                            likes={likes}
                            comments={comments}
                            createdAt={createdAt}
                        />
                    ))
                }
            </>
        )

    }
    return (
        <>

            {posts?.length < 1 ? <div className="bg-white flex flex-col justify-center items-center rounded-xl h-full p-4 shadow-md text-center">
                <p className='text-6xl py-10'>
                <AiOutlineFileImage />
                </p>
                <div className="text-3xl font-semibold text-gray-700">No Posts Found</div>
            </div> :

                posts?.map(({
                    _id,
                    content,
                    author,
                    image,
                    likes,
                    explanation,
                    comments,
                    createdAt }) => (

                    <Post
                        key={_id}
                        postId={_id}
                        desc={content}
                        author={author}
                        image={image}
                        likes={likes}
                        comments={comments}
                        createdAt={createdAt}
                        explanation={explanation}
                    />
                ))
            }
        </>
    )

}

export default Feed