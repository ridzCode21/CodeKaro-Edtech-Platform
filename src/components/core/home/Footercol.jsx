import React from 'react'
import { FooterLink1 } from '../../../data/footerlinks'
export const Footercol = () => {
    
  return (
    <div className='flex font-inter gap-[100px] '>
       {FooterLink1.map((item)=>(
             <div className='flex flex-col gap-3'>
                <div className='text-[#f3f4f6] text-[1.1rem] font-normal'>{item.title}</div>
                <div className='text-[#abafb5] flex flex-col gap-3 '>
                     {item.links.map((i)=>(
                        <p className='hover:text-[#7b86d9]'>{i.title}</p>

                     ))}
                </div>
             </div>
       ))}
    </div>
  )
}
