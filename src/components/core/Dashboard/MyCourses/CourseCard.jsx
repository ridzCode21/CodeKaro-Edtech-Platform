import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { formatDate } from "../../../../Services/formatDate"
import { useNavigate } from "react-router-dom"
import { setCourse, setEditCourse } from "../../../../slice/courseSlice"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"
import { useDispatch, useSelector } from "react-redux"
import {
    deleteCourse,
    fetchInstructorCourses,
  } from "../../../../Services/operations/courseDetails"
  import { useState } from 'react';
const CourseCard = ({courses,setCourses,item,id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
          setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
      }
    
   
  return (
    <div className={`${id%2==0?"bg-[#FD443A]":"bg-[#3200E0]"} w-11/12 h-[15rem] rounded-2xl`}>
          <div className= ' flex p-10 gap-5 ' >    
             <div className='md:w-[220px] md:h-[150px] flex '>
                <img src={item.thumbnail} alt=""  className=' rounded-xl'/>
             </div>

             <div className='flex flex-col text-white'>
                 <p className='text-2xl font-semibold flex'> {item.courseName}</p>
                 <div className='text-richblack-600  p-2 flex'>vdsnjvbsdhsbdjcnsdkcnjascnkjavsnsnks vdmcjdscnjsdncjsdncsdnncsdjcnsd kjvnsdkvnsfnsvmskdmn   sfkldfksnds</div>

                 <div className='flex flex-col'>
                        <div>
                        Created: {formatDate(item?.createdAt)}
                            </div>
                 </div>
             </div>
            <div className='flex flex-col justify-between'>
             <div className='bg-white flex p-3 h-8 items-center rounded-xl justify-center'>
                 <p>${item.price}</p>
            </div>
             <div className='flex gap-2'>
             <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${item._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300 mr- mb-"
                  >
                <FiEdit3  className='text-white text-[2rem]'/>
                          </button>
                          <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(item._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={30} className='text-white' />
                  </button>

             </div>
             {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

             </div>

            </div>  
    </div>
  )
}

export default CourseCard