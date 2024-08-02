import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../Common/IconBtn'
import { FaEdit } from "react-icons/fa";
import { updateAdditionalDetails,updatePfp } from '../../../Services/operations/Profileapi';
import { MdOutlineUploadFile } from "react-icons/md"
import { MdModeEdit } from "react-icons/md";


const Settings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.profile)
    const userPP = useSelector((state)=>state.profile.user.image)
    const token= useSelector(state=>state.auth.token);
    const [userPic,setUserPic] = useState(userPP)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserPic(URL.createObjectURL(file));
      }
      const handleUpload = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        updatePfp(token,file);
      }
      const [formData,setFormData] = useState({
          firstName:"",
          lastName:"",
          DOB:"",
          gender:"",
          No:"",
          about:""
      })
      
      const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }
    
      const handelAdditionalDetails = (e) => {
        e.preventDefault()
        updateAdditionalDetails(token,formData);
      }

  return (
    <div className='flex flex-col'>
         <div className='text-white ml-[12rem] mt-5'>
                <h1 className='text-3xl'>Edit Profile</h1>
           </div>
         <div className='mx-auto bg-[#030833] w-9/12 h-[15rem] mt-5 rounded-xl relative flex flex-col'>
          
          <div className='w-full h-[60%]  bg-cover rounded-xl cover'></div>
           <div className=' w-[7rem] absolute top-20 left-10 '>
               <img src={userPic} alt=""  className='rounded-[50%] aspect-square object-cover'/>
               
        </div>

           <form  onSubmit={handleUpload}>
          <div className='flex ml-40  mt-5 text-white px-5 flex-col'> 
              <div className='flex gap-5'>
               <label htmlFor="upload" >
               <input id='upload' type="file" onChange={handleFileChange} className="hidden" accept="image/png, image/gif, image/jpeg"/>
               <MdModeEdit  className='text-[1.5rem] text-blue-300 hover:text-blue-100'/>
               </label>
               <button type='submit' className=''><MdOutlineUploadFile className='text-blue-300 text-[1.6rem] hover:text-blue-100'/></button>
               </div>
            <span>{user.firstName +" "+ user.lastName}</span>  
          </div>
          </form>

         </div>

         <div className='mx-auto bg-[#030833] w-9/12  mt-5 rounded-xl relative flex flex-col p-5 gap-5'>
            <div className='text-white text-2xl'> Profile Information</div>
            <form onSubmit={handelAdditionalDetails} className='flex gap-3'>
               <div className='flex flex-col w-[46%] gap-5'>
                <div className='flex flex-col gap-2'>
                     <label htmlFor="firstName" className=" text-richblack-50">First Name</label>
                     <input defaultValue={user.firstName || null} type="text" name="firstName" id="firstName" placeholder="Enter first name" className="form-style" onChange={handleOnChange}/>
                  </div>

                  <div className='flex flex-col gap-2'>
                  <label htmlFor="dateOfBirth" className="text-richblack-50">Date of Birth</label>
                  <input defaultValue={user?.additionalDetails.dateOfBirth || null} type="date" name="dateOfBirth" id="dateOfBirth" className="form-style" onChange={handleOnChange}/>
                  </div>
                     
                  <div className='flex flex-col gap-2'>
                  <label htmlFor="contactNumber" className="text-richblack-50">Contact Number</label>
                  <input defaultValue={user?.additionalDetails.contactNumber || null} type="tel" name="contactNumber" id="contactNumber" placeholder="Enter Contact Number" className="form-style" onChange={handleOnChange}/>
                  </div>


             

               </div>
              
               <div className='flex flex-col w-[46%] gap-5'>
                        <div className='flex flex-col gap-2'>
                    <label htmlFor="lastName" className="text-richblack-50">Last Name</label>
                    <input defaultValue={user.lastName || null} type="text" name="lastName" id="lastName" placeholder="Enter first name" className="form-style" onChange={handleOnChange}/>
                        </div>
                  

                            <div className='flex flex-col gap-2'>
                            <label htmlFor="about" className="text-richblack-50">About</label>
                                        <input defaultValue={user?.additionalDetails.about || null} type="text" name="about" id="about" placeholder="Enter Bio Details" className="form-style" onChange={handleOnChange}/>
                            </div>
                     
                  <div className='flex flex-col gap-2'>
                  <label htmlFor="gender" className="text-richblack-50">Gender</label>
                      <select defaultValue={user?.additionalDetails.gender || null} type="text" name="gender" id="gender" className="form-style" onChange={handleOnChange}>
                      <option value="Prefer not to say">Prefer not to say</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Other">Other</option>
                        </select>
                  </div>

                  
                  <div className="flex justify-end gap-2"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>

             

               </div>
               

            </form>

         
         </div>

         
         

    </div>
  )
}

export default Settings