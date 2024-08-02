import React from 'react'
import dashboardimg from '../../../../assets/Images/Humaaans Space.png'
import { useEffect } from 'react'
import { getInstructorDashboard } from '../../../../Services/operations/Profileapi'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchInstructorCourses } from '../../../../Services/operations/courseDetails'
import { useNavigate } from 'react-router'
import hand from '../../../../assets/Images/hand.png'
import DashboardChart from './DashboardChart'
// import DashboardChart from './DashboardChart'
import chroma from 'chroma-js';
const InstructorDashboard = () => {
    
    const [details, setDetails] = useState([])
    const [courses, setCourses] = useState([])
    const [currentChart, setCurrentChart] = useState('revenue');
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentUser,setCurrentUser] = useState(user)

    useEffect(() => {
        ;(async () => {
            //get instructor details
            const instructorDetails = await getInstructorDashboard(token, dispatch);
            const instructorCourses = await fetchInstructorCourses(token);

            setCourses(instructorCourses);

            console.log("courses",instructorCourses);
            setDetails(instructorDetails);
            console.log("details",instructorDetails);
            // setCurrentUser(user)
            console.log("user details",currentUser)

        })();
    }, [])

    const totalEarnings = details?.reduce((acc, course) => {
        return acc + course?.totalRevenue;
    }, 0);
    const totalStudents = details?.reduce((acc, course) => {
        return acc + course?.totalStudents;
    }, 0);
   
  return (
    <div className='p-10'>
        <div className='w-9/12 bg-[#1A85FF] h-[250px] mx-auto mt-10 rounded-2xl p-5 flex items-center justify-between'>
            <div className='w-[50%]'>
                   <div className='flex items-center gap-3'>
                    <span className='text-2xl'>Welcome Back, {currentUser.firstName + " " + currentUser.lastName} </span>
                     <img src= {hand} alt="" />
                   </div>

            </div>
            <div className='relative w-[50%]'>
                <img src= {dashboardimg} alt="dashboard image" className='absolute w-[500px] -top-32' />
            </div>
        </div>
        <div className='flex mt-10 gap-2'> 
        <div className='bg-[#161d29] w-6/12 ml-[180px] h-[400px] flex flex-col p-5 items-center rounded-lg' >
             <div className='flex items-center justify-between space-x-4  w-full '>
                  <div className='text-white font-semibold text-xl'>
                      Visulalize Statistics
                  </div>
                  <div className='flex items-center gap-2'>
                        <button onClick={() => setCurrentChart('revenue')} className={`px-2 py-2 rounded-md ${currentChart === 'revenue' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>Revenue</button>
                        <button onClick={() => setCurrentChart('students')} className={`px-2 py-2 rounded-md ${currentChart === 'students' ? 'bg-richblack-900 text-yellow-100' : 'bg-richblack-800 text-richblack-100'}`}>Students</button>
                 </div>
            </div>
            
            <div className='flex w-3/6'>
                 <DashboardChart details={details} currentChart={currentChart}/>
            </div>
           

        </div>
        <div className='flex w-3/12 h-[400px] bg-[#161d29] rounded-xl flex-col p-6' >
                        <p className='text-lg font-bold text-richblack-5'>Statistics</p>
                        <div className='mt-4 space-y-4'>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Courses</p>
                                <p className='text-3xl font-semibold text-richblack-50'>{courses?.length}</p>
                            </div>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Students</p>
                                <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                            </div>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Earnings</p>
                                <p className='text-3xl font-semibold text-richblack-50'>₹ {totalEarnings}</p>
                                </div>
                        </div>
        </div>
        </div>
    </div>
  )
}

export default InstructorDashboard