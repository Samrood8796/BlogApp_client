import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { putAPI } from '../../utils/apiCalls';
import ChangePassword from '../changePassword/ChangePassword';
import ChangeDetails from '../changeDetails/ChangeDetails';
import { CameraIcon } from '../../icons/icons';
import { passwordSchema } from '../../schema/PasswordSchema';
import { userSchema } from '../../schema/userDetailsSchema';
import { setUserData } from '../../state/useReducer';
import axios from '../../utils/axios';
import { addProfilePic } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { FaUser } from 'react-icons/fa';
const UserDetails = ({ userData, forceRender, setForceRender }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file)
    }
    function handleSubmit() {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', image);
        formData.append('userId', userData._id);
        axios.post(addProfilePic, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("ddddddd");
            setForceRender(!forceRender)
            setImage(null)
            setLoading(false)
            dispatch(setUserData({ user: response.data }))
            // setShowInput(false)
        })
            .catch(error => {
                console.error(error);
            });
    }


    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    useEffect(() => {
        setName(userData.name || "")
        setUserName(userData.userName || "")
        setPhoneNumber(userData.phoneNumber)
        setEmail(userData.email || "")
        setBio(userData.bio || "")
    }, [userData])
    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [bio, setBio] = useState("");


    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({
        bio: "",
        name: "",
        userName: "",
        email: "",
        phoneNumber: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const token = useSelector(state => state.token)
    // const initialUserInfo = { ...userData };

    const handleChange = (event) => {
        const { name, value } = event?.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveDetails = async () => {
        const formData = {
            name,
            email,
            userName,
            phoneNumber,
            bio
        }
        console.log(formData);
        userSchema
            .validate(formData, { abortEarly: false })
            .then(async () => {
                try {
                    setLoading(true)
                    const data = await putAPI(`/${userData?._id}`, formData, token);
                    console.log(data, "done");
                    setLoading(false)
                    setIsEditing(false)
                    setForceRender(!forceRender)
                } catch (err) {
                    setLoading(false)
                    toast.error(err.response.data.error, {
                        position: "top-right",
                    });
                    console.error(err);
                }
            }).catch((err) => {
                setLoading(false)
                console.log(err);
                const errors = {};
                err.inner.forEach((e) => {
                    errors[e.path] = e.message;
                });
                setFormErrors(errors);
            });

    }
    const handleSave = () => {
        passwordSchema.validate(formValues, { abortEarly: false })
            .then(async () => {
                try {
                    setLoading(true)
                    const userDetails = {
                        ...userData,
                        oldPassword: formValues?.oldPassword || null,
                        newPassword: formValues?.newPassword || null,
                        confirmPassword: formValues?.confirmPassword || null,
                    }
                    const { data } = await putAPI(`/${userData?._id}`, userDetails, token);
                    setFormErrors({});
                    setLoading(false)
                    setIsPasswordChange(false)
                } catch (err) {
                    setLoading(false)
                    toast.error(err?.response?.data?.error, {
                        position: "top-right",
                    });
                }
            })
            .catch((errors) => {
                setLoading(false)
                const validationErrors = {};
                errors.inner.forEach((error) => {
                    console.log(error.message);
                    validationErrors[error.path] = error.message;
                });
                setFormErrors(validationErrors);
            });

    };

    return (
        <>
            {loading && (
                <Loader textContent={"Submiting........."} />
            )}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="md:flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 relative">
                        {
                            userData?.profilePic ?
                                <img
                                    src={userData?.profilePic}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full border-4 border-primary-main"
                                /> :
                                <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
                                    <FaUser className='w-full h-full rounded-full' />
                                </div>
                        }
                        <label htmlFor='file' className='cursor-pointer'>
                            <div className='absolute w-8 h-8 left-10 bottom-0'>
                                <CameraIcon />
                                <input type="file" id='file' onChange={handleImageChange} hidden />
                                {image &&
                                    <button onClick={handleSubmit} className='bg-blue-500 px-2 rounded-xl'>submit</button>
                                }
                            </div>
                        </label>
                        <div>
                            {isEditing ? (
                                <div>
                                    <span className="font-semibold">Name:</span>
                                    <input
                                        type="text"
                                        name='name'
                                        className="text-2xl font-semibold w-full focus:outline-none border-b border-primary-main"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <p className='text-red-500'>{formErrors?.name}</p>
                                    <span className="font-semibold">userName:</span>
                                    <input
                                        type="text"
                                        name='userName'
                                        className="text-gray-600 w-full focus:outline-none border-b"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <p className='text-red-500'>{formErrors?.userName}</p>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-semibold">{userData.name}</h2>
                                    <p className="text-gray-600">@{userData.userName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {isEditing ? (
                        <div className="flex space-x-2 justify-end">
                            <button
                                className="bg-primary-main text-white bg-[#8d76ff]  px-4 py-2 rounded-lg hover:bg-primary-light"
                                onClick={handleSaveDetails}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div>
                            {
                                isPasswordChange ?
                                    <div className='flex justify-end space-x-2'>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={() => setIsPasswordChange(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    :
                                    <div className='flex justify-end'>
                                        <button
                                            className="bg-blue-500 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={() => setIsPasswordChange(true)}
                                        >
                                            Change Password
                                        </button>
                                        <button
                                            className="bg-blue-500 mx-2 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                            }
                        </div>
                    )}
                </div>

                {isPasswordChange && (<ChangePassword handleChange={handleChange} formErrors={formErrors} />)}
                {isEditing ? (<ChangeDetails
                    bio={bio}
                    email={email}
                    phoneNumber={phoneNumber}
                    setBio={setBio}
                    formErrors={formErrors}
                    setEmail={setEmail}
                    setPhoneNumber={setPhoneNumber}
                />) : isPasswordChange ? null : (
                    <div className="text-gray-600">
                        <p className="mb-2">
                            <span className="font-semibold text-green-400">On Blogger since June 2023</span>
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Email:</span> {userData.email}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Mobile:</span> {userData.phoneNumber}
                        </p>
                        <p>
                            <span className="font-semibold">Bio:</span> {userData.bio}
                        </p>
                    </div>
                )}
                <Toaster />
            </div>
        </>
    );
};

export default UserDetails;
