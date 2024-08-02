import React from 'react'
import { IoVideocam } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from 'react'
import RatingStars from '../../Common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import { MdPeopleAlt } from "react-icons/md";


const CatalogCard = ({course,Height}) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  let lecture = 0
   const lectureCal = ()=>{
      
        course.courseContent.map((item)=>{
          if(item.subSection?.length)
           lecture = item.subSection?.length + lecture
          else
            lecture = lecture + 0
    })
    console.log('lecture count',lecture)
   }
   lectureCal()
  useEffect(()=> {
      const count = GetAvgRating(course.ratingAndReviews);
      
      
      setAvgReviewCount(count);
  },[course])

  return (
    <>
    

           

    
    
      
        <div className='mt-10 max-w-[400px] bg-[#181a1b] border-[#353a3c] rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-300 border-[1px] flex flex-col mx-auto'>
        <Link to={`/courses/${course._id}`}>
            <img src={course.thumbnail} alt='course thumbnail'   className={`${Height}  rounded-xl object-cover border-[#353a3c] border-[1px]`}
            />
            <div className='flex justify-between mt-5 items-start'>
            <div className='text-white  flex flex-col'>
                 <span className='text-xl font-bold'>{course?.courseName} </span>
                
                </div>
            
            <div className='text-[#6674cc] bg-white max-w-[30%] flex p-2 rounded-lg' >
                 <span className='font-semibold flex items-center justify-center'> Rs.{course?.price}  </span>
                </div>
        </div>

        <div className='flex items-center justify-between '>
   
         <div className='flex items-center'>
           <IoVideocam className='text-[#23c45c]'  size={30}/>
            <span className='text-[#23c45c]'>{lecture==1 ? `${lecture} Lecture`:`${lecture} Lectures`} </span>
            </div>    
           <span className='flex items-center text-[#ef476f] font-semibold'> <MdPeopleAlt className='text-[#ef476f]' size={30}/> {course.studentsEnrolled.length} </span>

        </div>

        <span className='mt-3'> <hr className='text-richblack-200 rounded-3xl'/></span>
  
     <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
            <span className='text-richblack-200'>Author:</span>
            <span className='text-white'>{course?.instructor?.firstName} {course?.instructor?.lastName}</span>
        </div>
        <div className='flex gap-2'>
           
             <span className='text-[#FC7405]'>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
                    
            </div>
        </div>
        </Link>
        </div>

       

     
      
    </>
  )
}       

export default CatalogCard