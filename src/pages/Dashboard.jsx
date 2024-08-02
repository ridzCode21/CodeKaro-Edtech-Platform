import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'


const Dashboard = () => {
    const {loading : authLoading} = useSelector((state)=> state.auth)
    const {loading : profileLoading} = useSelector((state)=> state.profile)

    if(authLoading || profileLoading){
        return(
             <div>
                 Loading...
             </div>
        )
    }

  return (
    <div className='flex relative mt-1'>
         
        <div className=' flex-1  bg-richblack-900 absolute -z-5  w-full max-h-[2000px] min-h-screen  flex-col'>
        <Sidebar />
                <Outlet />
              
          </div>
      </div>
    )
}

export default Dashboard