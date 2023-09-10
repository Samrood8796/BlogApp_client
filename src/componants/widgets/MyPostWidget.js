import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { FcAddImage } from 'react-icons/fc';
import Loader from '../Loader/Loader';
import { setPosts } from '../../state/useReducer';
import axios from '../../utils/axios'
import { createPost } from '../../utils/constants';
const MyPostWidget = ({ picturePath, setCreatePostModal }) => {

    const [loading, setLoading] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState('');

    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    console.log(token);
    const dispatch = useDispatch()
    const postSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').matches(/^\S.*$/, 'Field must not start with white space')
    });

    const handlePost = async () => {
        try {
            await postSchema.validate({ title }, { abortEarly: false });
            setLoading(true);
            const formData = new FormData();
            formData.append("userId", user._id);
            formData.append("title", title);
            formData.append("explanation", value.replace(/<\/?(p)>/gi, ''));
            if (image) {
                formData.append("file", image);
                formData.append("filePath", image?.name);
            }
            const response = await axios.post(createPost, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response) {
                dispatch(setPosts({ posts: [response.data, ...posts] }));
                setTitle('');
                setValue('');
                setImage(null);
                setIsImage(false);
                setErrors({});
                setLoading(false);
                setCreatePostModal(false);
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errors = error?.inner?.reduce(
                    (acc, err) => ({
                        ...acc,
                        [err.path]: err.message,
                    }),
                    {}
                );
                setErrors(errors);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <>
            {loading && (
                <Loader textContent={"Submiting........."} />
            )}
            <div className="fixed font-serif top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="w-3/5 p-4 bg-white rounded-lg border border-neutral-medium">
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="w-full bg-neutral-light rounded-lg p-4 border focus:outline-none focus:border-primary-main"
                    />
                    {errors?.title && (
                        <p className="text-red-500 text-center mb-2">{errors?.title}</p>
                    )}
                    {isImage ? (
                        <div className="border-dashed border-2 border-blue-500 p-4 rounded-lg mt-2 z-10">
                            <div className="flex flex-col items-center justify-center space-y-2">
                                {image ? (
                                    <div className='flex '>
                                        <img
                                            style={{ width: "6rem", height: "4rem" }}
                                            src={URL.createObjectURL(image)}
                                            alt="PostImage"
                                        />
                                        <p
                                            onClick={() => setImage(null)}
                                            className="text-6xl cursor-pointer text-red-500 hover:text-red-700"
                                        >
                                            <IoIosClose />
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center">
                                            <p className="text-2xl">
                                                <AiOutlinePlus />
                                            </p>
                                            &nbsp;
                                            <p>Pick Your File</p>
                                        </div>
                                        <label
                                            htmlFor="fileInput"
                                            className="cursor-pointer text-blue-600 hover:underline"
                                        >
                                            Browse
                                        </label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="hidden"
                                            onChange={(e) => {
                                                setImage(e.target.files[0]);
                                            }}
                                            accept="image/jpeg, image/png"
                                        />
                                    </>)
                                }
                            </div>

                        </div>
                    ) : null}
                    <div className="flex items-center space-x-2 mt-4">
                        {!isImage ?
                            <button
                                onClick={() => setIsImage(!isImage)}
                                className="text-5xl hover:text-primary-main "
                            >
                                <FcAddImage />
                            </button>
                            :
                            <button
                                onClick={() => setIsImage(!isImage)}
                                className="text-xl hover:text-primary-main "
                            >
                                cancel
                            </button>
                        }
                    </div>
                    <div className="w-full mt-4">
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={setValue}
                            modules={{
                                toolbar: [
                                    [{ header: [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['image'],
                                ],
                            }}
                            className="bg-white p-2 rounded-lg border border-gray-300"
                        />
                    </div>
                    <button
                        onClick={handlePost}
                        className="bg-[#8d76ff] border rounded-lg px-5 py-2 text-white mt-4 hover:bg-primary-light"
                    >
                        POST
                    </button>
                    <button
                        onClick={() => setCreatePostModal(false)}
                        className="bg-gray-400 border mx-2 rounded-lg px-5 py-2 text-white mt-4 hover:bg-primary-light"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default MyPostWidget;
