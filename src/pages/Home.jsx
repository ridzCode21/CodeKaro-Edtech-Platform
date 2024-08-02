import React from 'react'
import { useEffect, useRef } from 'react';
import { HiArrowRight } from "react-icons/hi";
import {Link} from 'react-router-dom'
import heroimg from '../assets/Images/blogging.png'
import HighlightText from '../components/core/home/HighlightText';
import CTAButton from '../components/core/home/Button'
import Hoverbox from '../components/core/home/Hoverbox';
import teacher from '../assets/Images/Instructor.png'
import frame from '../assets/Images/frame.png'
import Footer from '../components/Common/Footer';
import hover_img from '../components/core/home/live_class.png'
import phone from '../components/core/home/anywhere.png'
import hasset1 from '../components/core/home/expert_teacher.png'
import hasset2 from '../components/core/home/unlimited_access.png'
import patterbg from '../assets/Images/always-grey.png'
export const Home = () => {
  
  return (
    //  section1
    <>
  
    <div className='flex flex-row w-11/12 items-center  z-50'>
    <div className='relative flex flex-col w-[50%] ml-[150px] mt-[80px] min-h-auto text-white justify-between gap-5'>
         <Link to={'/signup'}>
          <div className='   rounded-full font-bold text-white-200 transition-all duration-200 hover:scale-95 w-fit  gas ar'>
            <div className='flex flex-row rounded-full px-10 py-5 items-center gap-4 '>
                <p>Become an Instructor</p>
                <HiArrowRight />
            </div>
          </div>  
         </Link>
        <div className='text-4xl font-semibold'>
          Empower Future With 
          <HighlightText tex={"Coding Skills"} colorname={"#ef476f"} active={true}/>
        </div>
        <div>
      With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>
        <div className='flex gap-4 mt-[50px]'>
        <CTAButton active = {true} tolink = {'/signup'}>
            Learn More
        </CTAButton>
        <CTAButton  active = {false} tolink = {'/login'}>
             Show Demo
        </CTAButton>
        </div>
       
    </div>
    <div className='flex mt-[100px]'>
         <img src={heroimg} alt="" />
    </div>
    </div>
    <div className='mt-[21%] absolute -z-9 mx-auto '>
        <div className=" w-[55.125rem] h-[55.125rem] rounded-full border border-[#19191A]  absolute opacity-40   bg-glassmorphism1 left-[300px] -bottom-[43.875rem]  "></div>
        <div className=" w-[46.875rem] h-[46.875rem] rounded-full border border-[#19191A] absolute  opacity-40  bg-glassmorphism2  -bottom-[39.75rem] left-[360px]"></div>
        <div className=" w-[39.375rem] h-[39.375rem] rounded-full border border-[#19191A] absolute  opacity-40   bg-glassmorphism3  -bottom-[36rem] left-[410px]"></div>
    </div>
    {/* section 2*/}
    <div>
        <Hoverbox  bg={'#109be7'} content = {( <div className='inner  w-full h-[500px] flex relative bg-richblack-900 text-white items-center  justify-evenly'>
             < div className='ml-10'>
               <img src={hover_img} alt="" className='w-[400px]'/>
             </div>
            <div className='  flex flex-col gap-2'>
            
             <div className='text-[1.2rem] font-semibold'>
              <HighlightText tex ={"Who are We"} colorname={"#ef476f"} active={false}/>
              </div>
              <div className='text-4xl font-semibold w-[400px] '>
                Best Code Learning  Choice?
            </div>  
            <div className='text-[#838894]'>
            Choose CodeHelp for an unparalleled coding experience.
            </div>
            <div className='mt-10'> 
             <CTAButton active = {true} tolink = {'/signup'}>
            Learn More
             </CTAButton> 
             </div>
             </div>
        
      
      </div>)}/>
        <Hoverbox  bg={"#7b8fd9"} content={  <div className='inner w-full bg-richblack-900  relative  p-1 h-[300px] flex items-center justify-around font-inter'>
         <div className='flex flex-col text-center items-center font-semibold'> 
              <img src={phone} alt="" className='w-[100px] h-[100px]'/> 
               <div className='text-2xl text-white text-center mt-5'>Learn Anywhere</div>
               <div className='text-[#838894] w-[300px]'>Enjoy ease of learning from anywhere with you convinence</div>
         </div>
         <div className='flex flex-col text-center items-center font-semibold'> 
          <img src={hasset1} alt="" className='w-[100px] h-[100px]'/> 
          <div className='text-2xl text-white text-center mt-5'>Expert Teachers </div>
          <div className='text-[#838894] w-[300px]'>get unlimited access to wide range of courses to boost knowledge</div>

          </div>
         <div className='flex flex-col text-center items-center font-semibold'> 
          <img src={hasset2} alt="" className='w-[100px] h-[100px] '/> 
          <div className='text-2xl text-white text-center mt-5'>Unlimited Access </div>
          <div className='text-[#838894] w-[300px]'>get unlimited access to wide range of courses to boost knowledge</div>

          </div>

        </div>}/>
    </div>
     {/* section 3 instructor*/}
     <div className='bg-white  w-full h-[800px] mt-10 '>
          <div className='flex mt-[150px]  mx-auto w-9/12  flex-row justify-evenly items-center '>
             <div className='w-[40%] relative'>
             <div className=''>
                     <img src={frame} alt="" className=''/> 
                 </div>
              <div className='absolute -top-4 left-4 '>
                 <img src={teacher} alt="" className=''/> 
                </div>
                
            </div> 
           
             <div className='flex flex-col w-[60%]  pl-[100px]' >
                   <div className='text-3xl font-inter font-bold'>Become an 
                    <HighlightText tex = {'Instructor Today'} colorname={"#ef476f"} active={true}/></div>
                   <div className='flex flex-wrap text-justify w-[60%] text-[#2c333f]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
                    <div className='mt-[2rem] flex'>
                    <CTAButton active = {true} tolink = {'/signup'}>
                        Start Teaching Today
                       
                      </CTAButton>
                      

                    </div>
             </div>
             
          </div>
          <div className='bg-[#6674cc] w-9/12 h-[300px] mx-auto relative rounded-3xl mt-10 flex items-center justify-evenly md:flex-col sm:flex-col' style={{backgroundImage:`url(${patterbg})`}}
          >
             <div> 
               <h2 className='text-3xl font-inter font-bold text-white'>What would you learn?</h2>
             </div>
             <div>
             <CTAButton active = {true} tolink = {'/signup'}>
               Get Started
        </CTAButton>
             </div>
          </div>
     </div>

    {/* section 4 */}
    <div className='bg-[#202329] w-full h-[500px]'>
       <Footer/>
   </div>
    
  </>
  )
}
