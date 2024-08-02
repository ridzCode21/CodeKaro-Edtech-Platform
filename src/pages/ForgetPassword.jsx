import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Common/Footer'
import { getPasswordResetToken } from '../Services/operations/authapi'
const ForgetPassword = () => {
    const {loading} = useSelector((state)=> state.auth)
    const [emailSent,setEmailSent] = useState(false)
    const [email,setEmail] = useState('')
   const dispatch = useDispatch()
   
    const handleOnSubmit = (e)=>{
            e.preventDefault()
            dispatch(getPasswordResetToken(email,setEmailSent))
    }
  return (
    <>
    <div className='flex items-center justify-center lg:w-full h-[70%] bg-richblack-900 p-10 mt-[100px] '>
        {
            loading? 
            (
                <div> Loading...</div>
            ):
            (
                <div className='flex-col flex w-[30%] mx-auto'> 
                    {
                        !emailSent?
                        (
                            <h1 className='text-white text-3xl font-bold font-inter'>Reset your password</h1>
                        ):
                        (
                            <h1  className='text-white'>Check your email</h1>
                        )
                    }
                    { 
                      <p className='text-white'>
                      {  !emailSent?
                        (
                             "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"

                        ):
                        (
                            `We have send reset email to ${email}`

                        )
                    }

                        </p>
                    }
                    <form className='flex flex-col' onSubmit={handleOnSubmit}>
                        {
                            !emailSent && 
                            (
                                <div className="flex gap-x-4 w-[100%] justify-start">
                                <label className='w-full'>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Email <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                required
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Enter email address"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label> 
                            </div>
                            )
                        }
                      
                 <button
                    type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                   {
                     !emailSent? ('reset password'):("resend email")
                   }
            </button>
              
                    </form>
                </div>
            )
        }
    </div>

    <Footer/>
    </>
  )
} 

export default ForgetPassword