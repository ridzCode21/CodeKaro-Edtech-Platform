import React from 'react'
import { useEffect, useRef } from 'react';
import CTAButton from './Button'
import HighlightText from './HighlightText';
import hover_img from './live_class.png'
import phone from './anywhere.png'
import hasset1 from './expert_teacher.png'
import hasset2 from './unlimited_access.png'
const Hoverbox = ({bg,content}) => {
    const cardRef = useRef(null);
    const blobRef = useRef(null);
    const fakeBlobRef = useRef(null);
    const css = {
      background : bg,
  }
  useEffect(() => {
    const handleMouseMove = (ev) => {
      if (blobRef.current) {
       
        const rec = blobRef.current.getBoundingClientRect();
        
 
        blobRef.current.animate(
          [{
            transform: `translate(${ev.clientX - rec.left - (rec.width / 2)}px, ${ev.clientY - rec.top - (rec.height / 2)}px)`,
          }],
          {
            duration: 300,
            fill: "forwards",
          }
        ) ;
      
     }
     
    };

    const handleMouseEnter = () => {
      window.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (blobRef.current) {
        blobRef.current.animate(
          [{
            transform: 'translate(0, 0)',
          }],
          {
            duration: 300,
            fill: "forwards",
          }
        );
      }
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (cardElement) {
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div className='carditem card  w-10/12 mx-auto relative z-50 overflow-hidden mt-[100px] flex' ref={cardRef}>
    <div className={`blob w-[50%] h-[70%] -z-9 `} ref={blobRef} style={css}></div>
      
        {content}

        
    </div> 
  )
}

export default Hoverbox