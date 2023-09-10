import React from 'react'

const ChangePassword = ({ handleChange, formErrors }) => {
    return (
        <div className="text-gray-600">
            <div className="mb-4">
                <span className="font-semibold">Old password:</span>
                <input
                    type="text"
                    name='oldPassword'
                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-2 mt-2"
                    onChange={handleChange}
                />
                <p className='text-red-500'>{formErrors?.oldPassword}</p>
            </div>
            <div className="mb-4">
                <span className="font-semibold">New Password:</span>
                <input
                    type="text"
                    name='newPassword'
                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-2 mt-2"
                    onChange={handleChange}
                />
                <p className='text-red-500'>{formErrors?.newPassword}</p>
            </div>
            <div className="mb-4">
                <span className="font-semibold">Confirm Password:</span>
                <input
                    type="text"
                    name='confirmPassword'
                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-2 mt-2"
                    onChange={handleChange}
                />
                <p className='text-red-500'>{formErrors?.confirmPassword}</p>
            </div>
        </div>
    )
}

export default ChangePassword