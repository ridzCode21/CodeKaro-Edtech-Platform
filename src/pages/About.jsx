import React from 'react'
import Hoverbox from '../components/core/home/Hoverbox'
import { DiVim } from 'react-icons/di'
import avatar from '../assets/Images/view-3d-man-holding-laptop.jpg'
import github from '../assets/Images/github.png'
import linked from '../assets/Images/linkedin.png'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div className='text-white'>
        <Hoverbox bg={'#23c45c'} content={(
            <div className='inner w-full relative bg-richblack-900 flex justify-evenly p-10 items-center'> 
               
                <img src={avatar} alt="" className='w-[400px] aspect-square rounded-lg' />
                <div className='w-[50%] flex flex-col h-full'>
                        <p className='text-white text-2xl font-semibold'>Hi I'm <span className='logo '>Riddhesh Chaudhari,</span> </p>
                        <p className='text-richblack-5 mt-10 text-justify'>
                            I am software developer skilled in javascript, python, c++.I have experienced in working with MERN stack.Currently I am pursuing BTech from IIIT Surat.I am also problem solver and have done Dsa and competitive programming on coding platforms. 
                        </p>
                        <div className='mt-10  flex gap-5'>
                            <Link to='https://github.com/riddhesh21'>
                               <img src= {github} alt=""  className='w-[50px] transistion-all duration-200  hover:-translate-y-1 '/>
                           </Link>
                           <Link to='https://www.linkedin.com/in/riddhesh-chaudhari/'>
                            <img src= {linked} alt=""  className='w-[50px] transistion-all duration-200  hover:-translate-y-1 '/>
                            </Link>
                        </div>
                </div>
           </div>)}/>
    </div>
  )
}

export default About