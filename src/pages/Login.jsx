import React from 'react'
import Footer from '../components/Common/Footer'
import Hoverbox from '../components/core/home/Hoverbox'
import Lottie from "lottie-react";
import login from '../assets/Images/login.json'
import LoginForm from '../components/core/auth/LoginForm';
const Login = () => {
  
  
  return (
    <>
      <div className='-mt-16'> 
        <Hoverbox bg={'#fb9014'}
                content={(<div className='inner w-full relative bg-richblack-900 flex justify-evenly p-10'> 
                <LoginForm/>
                <Lottie animationData={login} loop={true} className='lg:w-[50%] lg:h-[500px]'/>
                  
                  
                </div>)}
             />
        

      </div>
      <div className='bg-[#202329] w-full h-[500px]'>
       <Footer/>
   </div>

      </>
       
  )
}

export default Login