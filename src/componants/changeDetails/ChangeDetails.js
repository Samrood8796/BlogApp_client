import React, { useState } from 'react'

const ChangeDetails = ({ email, phoneNumber, bio, setEmail, setPhoneNumber, setBio, formErrors }) => {
    return (
        <div className="text-gray-600">
            <div className="mb-4">
                <span className="font-semibold">Email:</span>
                <input
                    type="text"
                    name='email'
                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-2 mt-2"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                   <p className='text-red-500'>{formErrors?.email}</p>
            </div>
            <div className="mb-4">
                <span className="font-semibold">Mobile:</span>
                <input
                    type="number"
                    name='phoneNumber'
                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-2 mt-2"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                   <p className='text-red-500'>{formErrors?.phoneNumber}</p>
            </div>

            <div>
                <span className="font-semibold">Bio:</span>
                <textarea
                    name='bio'
                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-2 mt-2"
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)} 
                />
                   <p className='text-red-500'>{formErrors?.bio}</p>
            </div>
        </div>
    )
}

export default ChangeDetails