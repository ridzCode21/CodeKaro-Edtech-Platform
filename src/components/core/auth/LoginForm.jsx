import React from 'react'
import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login} from '../../../Services/operations/authapi'
import { Link } from 'react-router-dom'
const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formdata,setformdata] = useState({
      email : "",
      password : "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleOnChange  = (e)=>{
    setformdata((prevData)=>(
       {
         ...prevData,
         [e.target.name] : [e.target.value]
       }
    ))
  }
  const {email,password} = formdata
  const handleOnSubmit = (e)=>{
        e.preventDefault()
       dispatch(login(email,password,navigate))

  }
  return (
    <div className='lg:w-[40%] bg-richblack-900 rounded-3xl border-[2px] border-richblack-700 p-5'>
      <div className='text-white font-semibold text-[1.6rem] font-inter leading-[1.9rem] mb-3 p-5'>Welcome Back</div>
       <form  className="flex w-full flex-col gap-y-4 mt-5" onSubmit={handleOnSubmit}>
        <div className="flex gap-x-4 p-5">
          <label className='w-full'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>  
          </div> 
          <div className="flex gap-x-4 p-5">
          <label className='w-full relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? 'text':'password'}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
             <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>  
        </div> 
       
        <button
          type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 "
        >
          Sign In
        </button>
        
          </form>
         <Link to='/forget-password'> <div className=' text-[#47a5c5]'>forgot password</div></Link>
       </div>
  
  )
}

export default LoginForm