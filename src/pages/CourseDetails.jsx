import React from 'react'
import { buyCourse } from '../Services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { fetchCourseDetails } from '../Services/operations/courseDetails';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import RatingStars from '../components/Common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaShareSquare } from 'react-icons/fa';
import { addToCart } from '../slice/cartSlice';
import { ACCOUNT_TYPE } from '../utils/constants';
import {FaChevronDown} from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { MdPeopleAlt } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import Footer from '../components/Common/Footer';

const CourseDetails = () => {

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {courseId} = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const {cart}=useSelector((state)=>state.cart);


  const handelPayment = () => {
    if(token){
        buyCourse(token,[courseId],user,navigate,dispatch);
    }
    else{
        navigate('/login');
    }
}

useEffect(() => {
    const getCourseDetails = async() => {
        const response = await fetchCourseDetails(courseId,dispatch);
        console.log("getCourseDetails -> response", response);
        setCourseDetail(response);
    }
    getCourseDetails();
}, [courseId]);

useEffect(() => {
    if(courseDetail?.ratingAndReviews?.length > 0){
        const count = GetAvgRating(courseDetail?.ratingAndReviews);
        setAvgReviewCount(count);
        console.log("getCourseDetails -> count", parseInt(count));
        }
}, [courseDetail?.ratingAndReviews]);

let lecture = 0 
const lectureCal = ()=>{
      
    courseDetail?.courseContent.map((item)=>{
      if(item.subSection?.length)
       lecture = item.subSection?.length + lecture
      else
        lecture = lecture + 0
})
console.log('lecture count',lecture)
}
lectureCal()
//add to cart
const handelAddToCart = () => {
    if(token){
    dispatch(addToCart(courseDetail));
    // console.log("handelAddToCart -> courseId", courseDetail._id)
    }
    else{
        navigate('/login');
    }
}


useEffect (() => {
if(courseDetail){
    const Enrolled = courseDetail?.studentsEnrolled?.find((student) => student === user?._id);
    // console.log("CourseDetails -> Enrolled", Enrolled)
    if(Enrolled){
        setAlreadyEnrolled(true);
    }
}
}, [courseDetail, user?._id])





if(!courseDetail) return <div className='flex justify-center items-center h-screen'>
    <div className='custom-loader'></div>
</div>
  return (
      <div className='flex flex-col'>
              <div className='w-full box-content bg-[#19191a] flex items-center p-7 gap-10'>
                  <div className=' lg:ml-[5rem] lg:w-3/6 '>

                  <div className=' p-5 flex  flex-col gap-5'>
                        <div className='text-white text-[2rem] font-semibold font-inter flex '>
                                {courseDetail?.courseName}
                        </div>
                        <div className='flex text-[#b4b6bb] text-sm'>
                              {courseDetail.courseDescription}
                        </div>
                        <div className='flex items-center '>
                            <div className='flex items-center gap-3'>
                            <IoVideocamOutline className='text-[#23c45c]'  size={20}/>
                            <span className='text-[#23c45c]'>{lecture==1 ? `${lecture} Lecture`:`${lecture} Lectures`} </span>
                            <RxDividerVertical  className='text-richblack-700'/>
                            </div>
                            <div className='flex items-center gap-3'>
                            <span className='flex items-center text-[#fde047]  gap-2'> <MdPeopleAlt className='text-[#fde047]' size={20}/> {courseDetail?.studentsEnrolled.length + " Learner"} </span>  
                            <RxDividerVertical  className='text-richblack-700'/>
                            </div>
                            <div className='flex items-center gap-3 '>
                            <span className='flex items-center text-[#109fe7]  gap-2'> <BsGlobe className='text-[#109fe7]' size={20}/> English</span>  
                            </div>
                          </div>    
                        <div className='flex justify-between'>
                           
                            <div className='flex items-center gap-3'> 
                               <CgProfile  className='text-[#ef476f]' size={30}/>
                               <span className='text-[#ef476f] flex gap-2'> {courseDetail.instructor.firstName+ " "}{courseDetail.instructor.lastName} </span>

                           </div>
                           <div className='flex gap-2'>
           
                                <span className='text-[#FC7405]'>{avgReviewCount || 0}</span>
                                    <RatingStars Review_Count={avgReviewCount} />
                                        
                              </div>
                           

                  </div>
              </div>
                 </div>
                

        <div className='relative lg:w-3/6'>
             <div className='bg-[#202329] rounded-lg absolute  border-[1px] border-[#353a3c] w-3/5 lg:min-h-[500px] -top-[100px] z-10 p-5 flex flex-col px-7'> 
                 
                  <img src= {courseDetail.thumbnail} alt="course Thumbnail" className='max-h-[300px] min-h-[220px] w-[400px] overflow-hidden rounded-2xl object-cover ' />

                  <div className='bg-white flex justify-center items-center p-2 rounded-lg max-w-[100px] mt-5'>
                            <span className='text-[#6674cc] text-semibold text-xl'>{"Rs "+courseDetail.price}</span>
                  </div>

                  <div>
                     {
                        ACCOUNT_TYPE.INSTRUCTOR !==user.accountType &&
                        <>
                         {
                            alreadyEnrolled? 
                            (
                               <div className='flex items-center justify-center mt-5'>
                                <button onClick={()=>{navigate("/dashboard/enrolled-courses")}} className='yellowButton w-full py-3 hover:scale-95 transition-all duration-200'>Go to Course</button>
                               </div>
                            ):
                            (
                                <div className='flex items-center justify-center mt-5'>
                                <button onClick={()=>{navigate("/dashboard/enrolled-courses")}} className='yellowButton w-full py-3 hover:scale-95 transition-all duration-200'>Start learning</button>
                               </div> 
                            )

                         }
                        </>
                     }

                  </div>

                  <div className=' flex flex-col mt-5'>
                        <div className='text-white text-xl'>This Course Inclues:</div>

                        <div className='flex flex-col gap-1 text-sm text-caribbeangreen-100'>
                                    {
                                        JSON.parse(courseDetail?.instructions).map((item,index) => (
                                            <div key={index} className='flex gap-2 items-center'>
                                                <span className='text-lg'>✓</span>
                                                <span>{item}</span>
                                            </div>
                                        ))
                                    }
                         </div>
                  </div>

                  <div className='mt-5'>
                     {
                        ACCOUNT_TYPE.INSTRUCTOR !==user.accountType &&
                        <>
                         {
                             alreadyEnrolled ? (<div></div>) : 
                             (
                                 cart?.find((item) => item._id === courseDetail._id) ?
                                 (<button onClick={()=>{navigate("/dashboard/cart")}} className='blackButton text-richblack-5 flex items-center gap-2 hover:scale-95 transition-all duration-200'>
                                     <FiShoppingCart />
                                     Go to Cart
                                    </button>) :
                                 (<button onClick={handelAddToCart} className='hover:scale-95 items-center gap-2 blackButton text-white flex transition-all duration-200'>
                                     <FiShoppingCart />
                                    Add to Cart</button>)
                             )

                         }
                        </>
                     }

                  </div>
                  
             </div>
             </div>
             </div>
              
            <div className='mt-10 lg:w-[45%] border-[#353a3c] border-[1px] lg:ml-[7rem] p-10 rounded-lg'> 
                <div className='flex flex-col gap-y-3 '>
                        <div className='text-white text-2xl font-semibold'>
                           What you'll learn
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8'>
                            {
                            JSON.parse(courseDetail?.instructions).map((item,index) => (
                                            <div key={index} className='flex gap-x-2 items-center text-white '>
                                                <span className='text-lg'>
                                                   <SiTicktick />

                                                </span>
                                                <span className='flex'>{item}</span>
                                            </div>
                                        ))
                            }
                        </div>
                </div>


            </div>
             
             <div className='text-white lg:ml-[7rem] mt-5 font-semibold text-2xl'>Course Content</div>

            <div className='mt-10 lg:w-[45%] border-[#353a3c] border-[1px] lg:ml-[7rem]  rounded-lg'>
            {
                                courseDetail?.courseContent?.map((item, index) => (
                                    <details key={index} className=' border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 detailanimatation'>
                                        <summary className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-5 transition-[0.3s]'>
                                            <div className='flex items-center gap-2'>
                                            <FaChevronDown className='arrow '/>
                                            <span className='text-xl'>{item?.sectionName}</span>
                                            </div>
                                            <div className='space-x-4'>
                                                <span className='text-yellow-25'>{item?.subSection?.length} Lecture(s)</span>
                                            </div>
                                        </summary>
                                        <div className='mt-5'>
                                            {
                                                item?.subSection?.map((subItem, subIndex) => (
                                                    <div key={subIndex} className='relative overflow-hidden bg-richblack-900  p-5 border border-solid border-richblack-600'>
                                                        <div className='flex items-center gap-2'>
                                                        <IoVideocamOutline className='txt-lg text-richblack-5'/>
                                                        <span className='text-lg'>{subItem?.title}</span>
                                                        </div>
                                                    </div>
                                                    
                                                ))
                                            }
                                            </div>
                                    </details>
                                ))
                            }
            </div>

            <div className='mt-10 lg:w-[45%] lg:ml-[7rem]  rounded-lg  flex flex-col'>
                <div className='text-white text-2xl font-semibold'>
                     Reviews
                </div>
             <div className='grid grid-cols-1 sm:grid-cols-2 place-self-start place-items-center rounded-xl mb-10'>
             {
                                    courseDetail?.ratingAndReviews?.map((item, index) => (
                                        <div key={index} className='flex flex-col md:items-baseline gap-3 my-4 mt-12 ga'>
                                            <div className='flex items-center gap-2'>
                                                <img src={item?.user?.image} alt="user img" className='w-[30px] h-[30px] rounded-full object-cover'/>
                                                <div className='flex flex-col'>
                                                    <p className='md:text-xl min-w-max font-semibold'>{item?.user?.firstName} {item?.user?.lastName}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-2'>
                                                    <RatingStars Review_Count={item?.rating}/>
                                                </div>
                                                <p className='text-richblack-50 text-[12px] md:text-sm max-w-4xl'>{item?.review}</p>
                                            </div>
                                        </div>
                                    ))
                }
             </div>
             </div>
             <div className='bg-[#202329] w-full h-[500px]'>
       <Footer/>
   </div>

      </div>
  )
}

export default CourseDetails