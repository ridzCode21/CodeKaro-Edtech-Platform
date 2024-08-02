import React from 'react'
import cover from '../../../assets/Images/Clarence.png'
import { useSelector } from 'react-redux'
import IconBtn from '../../Common/IconBtn'
import { useNavigate } from 'react-router-dom'

const Myprofile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate()
    console.log(user)
    const imgUrl = user.image
    
  return (
    <>  
          <div className='text-white ml-[12rem] mt-5'>
                <h1 className='text-3xl'>My Profile</h1>
           </div>
          <div className='mx-auto bg-[#030833] w-9/12 h-[15rem] mt-5 rounded-xl relative flex flex-col'>
          
                <div className='w-full h-[60%]  bg-cover rounded-xl cover'></div>
                 <div className=' w-[7rem] absolute top-20 left-10 '>
                     <img src={imgUrl} alt=""  className='rounded-[50%] aspect-square object-cover'/>
                 </div>
                <div className='flex ml-40 items-center mt-10 text-white justify-between px-5'> 
                  <span>{user.firstName +" "+ user.lastName}</span>  
                <IconBtn 
                         text="Edit"
                          onclick={() => {
                               navigate("/dashboard/settings")
                            }} />
                </div>


          </div>
          <div className='mx-auto bg-richblack-900  w-9/12 h-[20rem] flex mt-10 justify-between'>
               <div className='w-4/12 bg-[#030833] h[20rem] rounded-lg  flex flex-col p-3 text-white gap-4 '>
                    <div className='text-[1.1rem] justify-between flex items-center'>
                       <span>Personal Details </span>
                       <IconBtn 
                         text="Edit"
                          onclick={() => {
                               navigate("/dashboard/settings")
                            }} />

                    </div>

                   
                    <div className='flex gap-5'>
                    <div className='flex flex-col w-[50%] gap-7'>
                       <div>
                         <p className='text-sm text-richblack-100'>First Name</p>
                         <p>{user.firstName}</p>
                         </div>
                         <div>
                         <p className='text-sm text-richblack-100'>Email</p>
                         <p>{user.email}</p>
                         </div>
                         <div>
                         <p className='text-sm text-richblack-100'>Phone Number</p>
                         <p>{user?.additionalDetails?.contactNumber??"Add Number"}</p>
                         </div>
                    </div>
                    <div className='flex flex-col w-[50%] gap-7'>
                    <div>
                         <p className='text-sm text-richblack-100'>Last Name</p>
                         <p>{user.lastName}</p>
                         </div>
                         <div>
                         <p className='text-sm text-richblack-100'>Phone Number</p>
                         <p>{user.additionalDetails.gender??"Add Gender"}</p>
                         </div>
                         <div>
                         <p className='text-sm text-richblack-100'>DOB</p>
                         <p>{user.additionalDetails.dateOfBirth??"Add DOB" }</p>
                         </div>
                          
                        
                    </div>
                    </div>
               </div>

               <div className='w-7/12 bg-[#030833] rounded-lg flex p-5 '>
                   <div className='flex flex-col gap-5'>
                   <div className='text-white text-2xl font-inter font-bold'>About</div>
                   <div className='text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis modi accusantium blanditiis error ipsa. Aut totam reprehenderit nisi sint possimus blanditiis amet. Dolorum voluptatibus tenetur deleniti cumque voluptas. Rerum, temporibus!
                   </div>
                   </div>
               </div>
          </div>
  
    </>
  )
}

export default Myprofile