import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserCourses as getUserEnrolledCourses}  from '../../../Services/operations/Profileapi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import bgimg from '../../../assets/Images/banner_background.png'
import { setUser } from '../../../slice/profileSlice';
const EnrolledCourses = () => {
  const dispatch=useDispatch();

  const {token}  = useSelector((state) => state.auth);
  const {user}  = useSelector((state)=>state.profile)
  const [enrolledCourses, setEnrolledCourses] = useState(undefined);
  const [progressData, setProgressData] = useState(undefined);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getEnrolledCourses = async() => {
         setLoading(true);
        const response = await getUserEnrolledCourses(token,dispatch);
        console.log("getEnrolledCourses -> response", response);
        setLoading(false);
        setEnrolledCourses(response?.courses);
        setProgressData(response?.courseProgress);
        

}
const totalNoOfLectures = (course) => {
  let total = 0;
  course.courseContent.forEach((section) => {
      total += section.subSection.length;
  });
  return total;
}


useEffect(()=> {
    getEnrolledCourses();
},[]);

if(Loading) {
    return (
        <div className='flex h-[calc(100vh)] w-full justify-center items-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500'></div>
            <div>Loading...</div>
        </div>
    )
}
  return (
    <>
    {
      !enrolledCourses?
      (
        <div>Loading...</div>
      ):
      (
        <div className='flex flex-col mt-5'> 
        <h1 className='text-white text-2xl ml-[12rem]'>Enrolled Courses</h1>
        <div className='w-9/12 mx-auto h-[15rem] mt-5 rounded-xl bg-cover flex p-10 font-inter flex-col gap-5' style={{backgroundImage : `url(${bgimg})`}}>
               <div className='text-3xl '> <span className='font-bold'>Welcome,</span> {user?.firstName} 👋</div>
               <div className='flex flex-col text-richblack-600'>
                 <span>Nice to have you back,what an exciting day!</span> 
                 <span>Get ready and continue your lesson today</span> 
    
                </div>
        </div>
         {
          !enrolledCourses.length?
          (
            <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any course yet</p>
          ):
          (
            <div className='w-9/12 mx-auto flex gap-2'>
                  {
                    enrolledCourses.map((course,index)=>(
                      <div className='mt-10 max-w-[400px] bg-[#181a1b] border-[#353a3c] rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-300 border-[1px] flex flex-col mx-auto' key={index}
                      onClick={()=>{
                        navigate(`view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection[0]}`)}}
                      >
                              <img src={course.thumbnail} alt='course thumbnail'   className={` rounded-xl object-cover border-[#353a3c] border-[1px] lg:h-[250px] h-[100px]`}/>
                              <div className='text-white  flex flex-col mt-3'>
                                   <span className='text-xl font-bold'>{course?.courseName} </span>
                
                                </div>

                                <div className='flex w-1/5 flex-col gap-2 px- py-3 text-white'>
                                    {
                                        progressData?.map((progress,index)=> {
                                            //show 0 progress if no progress data is available
                                            if(progress?.courseID === course?._id) {
                                                return (
                                                    <div key={index}>
                                                        <p>Completed: {progress?.completedVideos?.length} / {totalNoOfLectures(course)}</p>
                                                        <ProgressBar
                                                            completed={progress?.completedVideos?.length/totalNoOfLectures(course)*100}
                                                            total={progress?.total}
                                                            height='8px'
                                                            isLabelVisible={false}
                                                            />
                                                    </div>
                                                )
                                            }
                                            return null;
                                        }
                                        )
                                    }
                                    </div> 

                      </div>
                    ))
                  }
            </div>
          )
         }
        
        </div>
      )
    }
    
    </>
  )
}

export default EnrolledCourses
