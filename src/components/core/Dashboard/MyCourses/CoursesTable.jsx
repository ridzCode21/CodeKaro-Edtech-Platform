import React from 'react'
import courseptn from '../../../../assets/Images/courseptn.png'
import { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import CourseCard from './CourseCard';
import { setCourse } from '../../../../slice/courseSlice';


const CoursesTable = ({courses,setCourses}) => {
    const [colorType,setColorName] = useState(0)
    console.log(courses)
  return (
    <div className='flex flex-col gap-10'>
            {
                courses.map((item,index)=>(
                     <CourseCard key={index} courses={courses} setCourses={setCourse} item ={item} id={index}/>
                ))
            }
     </div>
  )
}

export default CoursesTable