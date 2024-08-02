import React from 'react'
import { Footercol } from '../core/home/Footercol'

const Footer = () => {
   
  return (
    <div className='flex mx-auto w-9/12  mt-[150px] gap-[150px] '>
        <div className='text-white text-3xl font-inter font-bold flex flex-col gap-3' >
             <div className='flex'> CODE<div className='logo'>KARO</div></div>
             <p className='font-normal text-base text-[#f3f4f6]'>The ultimate destination for every coders</p>
        </div>
         <div className=''>
            <Footercol/>
        </div>
        <div className='text-white text-2xl font-inter font-normal flex flex-col'>
            <div>
                Get In touch 
            </div>
            <div className='text-[1.1rem] text-[#abafb5] hover:text-[#7b86d9]'>
                support@codekaro.in
            </div>

        </div>
    </div>
  )
}       

export default Footer