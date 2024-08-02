import React from 'react'
import { Link } from 'react-router-dom'
const Tab = ({ tabData, field, setField }) => {
  return (
    <>
    <div className='flex gap-3'>
   {
    tabData.map((item)=>(
    <button 
      key = {item.id}
      onClick={() => setField(item.type)}
      className={`${
        field === item.type
          ? "rounded-full transition-all duration-200 hover:scale-95 w-fit  border-[2px] gas ne"
          : "bg-transparent text-white border-[2px] border-white"
      } py-2 px-5 rounded-full transition-all duration-200`}
    >
       <p className='  font-bold text-[14px]'>{item.tabName}</p>
   </button>
    ))
    }
    </div>
   </>
  )
}

export default Tab