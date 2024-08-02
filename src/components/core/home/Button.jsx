import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,tolink,active}) => {
  return (
    
    <Link to={tolink}>
    <div className=  {`text-center w-[200px] px-6 py-3 rounded-md font-bold text-[13px] ${active ? "bg-yellow-50 text-black":"bg-richblack-800"} hover:scale-95 transistion-all duration-200`} >
        {children}
    </div>
    </Link>
  )
}

export default Button