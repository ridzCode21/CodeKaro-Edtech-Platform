import React from 'react'
import Footer from '../components/Common/Footer'
import Hoverbox from '../components/core/home/Hoverbox'
import Lottie from "lottie-react";
import lottieAnimation from '../assets/Images/signup.json'
import grovywalk from '../assets/Images/grovywalk.json'
import Signupform from '../components/core/auth/Signupform';
import { useSelector } from 'react-redux';
const Signup = () => {
  const {loading} = useSelector((state)=>state.auth)
  
  return (
    <>
    {
       loading ? 
      (
        <div className='text-white'> Loading... </div>
      ):
      (
        <div className='-mt-16'> 
        <Hoverbox bg={'#23c45c'}
                content={(<div className='inner w-full relative bg-richblack-900 flex justify-evenly p-10'> <Lottie animationData={grovywalk} loop={true} className='lg:w-[50%] lg:h-[500px]'/>
                  <Signupform/>
                </div>)}
             />
        
      </div>
      )
    }

<div className='bg-[#202329] w-full h-[500px]'>
       <Footer/>
   </div>
    </>  
  )
  
}

export default Signup