import React from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import SidebarLinks from './SidebarLinks';
import { useDispatch, useSelector } from 'react-redux'
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from '../../Common/ConfirmationModal'
import {logout} from "../../../Services/operations/authapi"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Sidebar = () => {
  const {user, loading: profileLoading} = useSelector((state) => state.profile); 
  const {loading:authLoading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);
      
  return (
    <>
   
    <div className='bg-[#2d2f31] w-[4rem] min-h-full hover:w-[20rem] transistion-all duration-300 flex flex-col  gap-5 overflow-hidden group text-[1.2rem] z-10 absolute ' >
        { 
           sidebarLinks.map((link) => {
            if(link.type && user?.accountType !== link.type) return null;
            return (
                <SidebarLinks key={link.id}  link={link} iconName={link.icon} />
            )
        })}
      
      <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
        
      <div className='flex flex-col'>
                    <SidebarLinks
                        link={{name:"Settings", path:"/dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />

                  <button 
                        onClick={ () => setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                            confirmationModal
                        })}
                        className='text-sm font-medium text-richblack-300 '>

                        <div className='flex  gap-6  w-[24rem] text-[1.2rem] p-5'>
                            <VscSignOut className='scale-[2] '/>
                            <span>Logout</span>
                        </div>

                    </button>
                    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
   </div>
    </>
    
  ) 
}

export default Sidebar