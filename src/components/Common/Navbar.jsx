import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { FaCartShopping } from "react-icons/fa6";
import Profiledropdown from '../core/auth/Profiledropdown'
import { useEffect,useState } from 'react'
import { categories } from '../../Services/apiReq'
import { apiconnector } from '../../Services/apiconnectors'


const Navbar = () => {
    const dispatch = useDispatch();
    const {totalItems}  = useSelector((state)=>state.cart)
    const {token}  = useSelector((state)=>state.auth)
    const {user}  = useSelector((state)=>state.profile)
    const [sublinks,setsublinks] = useState([])
    const  location = useLocation()
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname)
    }
    const fetchSublinks =  async()=>{
        try{
             const result = await apiconnector('GET',categories.CATEGORIES_API)
             console.log("navbar",result)   
             if (result?.data?.data?.length > 0) {
                setsublinks(result?.data?.data);
            }
            localStorage.setItem("sublinks", JSON.stringify(result.data.data));
        }catch(err){
             console.log("could not fetch category data ",err)
        }

}
    useEffect(()=>{
          fetchSublinks()
    },[])
  return (
    <div className='flex justify-center items-center h-[4.5rem]  navbar-shadow'>
        <div className='flex justify-around w-9/12 items-center'>
       <Link to='/'> <div className='flex text-white text-3xl font-inter font-bold'> CODE<div className='logo'>KARO</div></div></Link>

       <nav>
        <ul className='flex gap-x-6'>
          {NavbarLinks.map((item,index)=>(
              <li key={index} >
                
             
                   { item.title == "Catalog"?(
                    <div className={`${matchRoute(item.path)?"text-[#7b86d9]":"text-white"} hover:text-[#7b86d9] font-inter font-medium text-[1.1rem] relative items-center group flex`}>
                       <p>{item.title}</p>              
                    <div className='absolute rounded-3xl bg-richblack-25 z-[1000] flex flex-col lg:w-[300px] invisible opacity-0 transistion-all duration-200 -left-20 top-12 group-hover:visible group-hover:opacity-100 lg:min-h-[40px]'>
                        <div className='absolute  bg-richblack-25 -z-10 flex flex-col lg:w-[40px] h-[40px] rotate-45 -top-5 left-32 select-none'></div>
                        {
                          sublinks? sublinks.map((item,index)=>(
                            <Link to={`/catalog/${item.name}`} key={index}>
                                <div className='text-richblack-800 p-5 flex flex-nowrap font-inter font-semibold hover:bg-richblack-50 z-10 rounded-3xl'> {item.name} </div>
                                </Link>
                            )) : (
                                <div className='text-richblack-800 p-5 flex flex-nowrap font-inter font-semibold hover:bg-richblack-50 z-10 rounded-3xl'> </div>

                            )
                        }
                        </div>
                   </div>):(
                    <Link to={item.path} key={index}>
                     <div className={`${matchRoute(item.path)?"text-[#7b86d9]":"text-white"} hover:text-[#7b86d9] font-inter font-medium text-[1.1rem] `} key={index} >{item.title}</div> 
                     </Link>
                   )}
             
             </li>
            
          ))}
        </ul>
    </nav>  
    <div className='flex-row gap-5 hidden md:flex items-center'>
  {  
  user && user.accountType!="instructor" && (
          <Link to = '/dashboard/cart' className='relative px-4'>
               <FaCartShopping className=' fill-richblack-25 w-7 h-7' size={30} />
                    {totalItems>0 && (
                        <span className='shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[2px] right-[8px]'>
                            {totalItems}
                        </span> 
                    )}
          </Link>
  )
}
  {
      token == null && (
        <Link to='/signup'> <div className='bg-[#6674cc] text-center w-[150px] px-6 py-3 rounded-3xl font-bold text-[13px] h-[3rem] flex items-center justify-center hover:bg-[#515db1]'>
       <div className='flex items-center text-center text-[16px] text-white ' >Get Started</div>
         </div>   </Link>
         )
      
  }
  
    
    {token && (<Profiledropdown/>)} 
    </div>
    </div>  
    </div>
  )
}

export default Navbar