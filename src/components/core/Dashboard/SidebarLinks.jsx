import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { NavLink,useLocation ,matchPath} from 'react-router-dom'

const SidebarLinks = ({link,iconName}) => {
       const Icon = Icons[iconName]
       const location = useLocation()

       const matchRoute = (route)=>{
          return matchPath({path:route},location.pathname)
       }

  return (
    <>
    { 
         <NavLink
            to={link.path}
            className={`relative`}
         >
         <div className='flex w-[24rem] gap-5  hover:bg-[#3e4143] p-5'> 
             <Icon className='scale-[2] text-white'/> 
            <span className='text-white invisible group-hover:visible'>{link.name}</span>
            <span className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 opacity-0 transition-all duration-300 ${matchRoute(link.path) ? "opacity-100": "opacity-0"}`}></span>
        </div>
        </NavLink>
    }
    </>
  )
}   

export default SidebarLinks