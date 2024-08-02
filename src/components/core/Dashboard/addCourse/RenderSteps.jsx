import React from 'react'
import { useSelector } from 'react-redux'
import { IoBuildOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { AiOutlineDash } from "react-icons/ai";
import CourseInformationForm from './courseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from '../PublishCourse/PublishCourse';

const RenderSteps = () => {
    const {step} = useSelector((state)=>state.course)
    
    const steps = [
        {
            id : 1,
            title : "course information",
            icon : <IoIosInformationCircleOutline />


            
        },
        {
            id : 2,
            title : "course builder",
            icon : <IoBuildOutline />
            
        },
        {
            id : 3,
            title : "Publish",
            icon :<MdOutlinePublishedWithChanges />

        }
    ]
  return (
 
    <div className='flex flex-col justify-center items-center'>
                        
            <div className='flex w-6/12 justify-between'>

             {
                    steps.map((item)=>(
                                <>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center'>
                                <div className={`${step < item.id? " bg-[#ef476f] pending":" bg-[#23c45c] completed"} rounded-[50%] p-4 w-[4rem] h-[4rem] flex items-center justify-center relative z-5`} key={item.id}>
                                    <div className='text-white text-3xl'> {item.icon}  </div>
                                    
                                    </div>
                               
                           <div className={`flex  ${item.id!==3? "visible" : "invisible"} text-3xl ${item.id < step ? "text-caribbeangreen-400":"text-richblack-600"}` }>
                                    
                                    
                                            <>
                                            <AiOutlineDash />
                                            <AiOutlineDash />
                                            <AiOutlineDash />
                                            <AiOutlineDash />
                                            <AiOutlineDash />
                                            </>
                                        
                                    
                                    
                                    
                                    
                        </div>
                        </div>
                        <div className='text-white w-[10rem]'>{item.title}</div>
                        </div>      
                                </>
                            ))
                        }
                            
            </div>
            
            <div className='w-8/12 bg-[#030833] mt-10 p-5 rounded-lg'>
                
                          {step === 1 && <CourseInformationForm />}
                          {step === 2 && <CourseBuilderForm/>}
                          {step===3 && <PublishCourse/>} 
                             
                    
            </div>
                


    </div>    
  )
}

export default RenderSteps