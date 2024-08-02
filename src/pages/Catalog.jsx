import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { categories } from '../Services/apiReq';
import { apiconnector } from '../Services/apiconnectors';
import { useEffect } from 'react';
import CourseSlider from '../components/core/Catlog/CourseSlider';
import { getCatalogaPageData } from '../Services/operations/pageAndComponentData';
import CatalogCard from '../components/core/Catlog/CatalogCard';
import { useDispatch } from 'react-redux';
import bg3d from '../assets/Images/Saly-13.png'
import earth from '../assets/Images/Saly-44.png'
import rocket from '../assets/Images/Saly-43.png'
import Footer from '../components/Common/Footer'
const Catalog = () => {
    const Catalog = useParams();
    const [Desc, setDesc] = useState([]);
    const [CatalogPageData, setCatalogPageData] = useState(null);
    const [categoryID, setcategoryID] = useState(null);
    const [activeOption, setActiveOption] = useState(1);
    const dispatch = useDispatch();

    const fetchSublinks=  async ()=>{
        try {
            const result = await apiconnector("GET",categories.CATEGORIES_API);
            const category_id= result.data.data.filter((item)=>item.name=== Catalog.catalog)[0]._id;
            setcategoryID(category_id);      
            setDesc(result.data.data.filter((item)=>item.name=== Catalog.catalog)[0]);
           
        } catch (error) {
            console.log("could not fetch sublinks");
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSublinks();
    }, [Catalog])
    
    useEffect(() => {
        const fetchCatalogPageData = async () => {
            
                const result = await getCatalogaPageData(categoryID,dispatch);
                setCatalogPageData(result);
            
        }
        if (categoryID) {
            fetchCatalogPageData();
        }
    }, [categoryID])
    
    
  return (
    <>
    <div className='text-white bg-[#361052] flex   w-screen h-[30rem] mt-1 justify-between '>
       
    <div className='ml-10 flex flex-col'>   
          <div className='mt-10'>
          <p className='text-sm text-richblack-300 '>Home / Catalog / <span className='text-yellow-50'>{Catalog.catalog}</span> </p>
          </div>
          <div className='flex flex-col md:mt-32'>
         <span className='highlightedText text-[3rem]'>{Catalog.catalog}</span>
         <span className='text-richblack-100'>{Desc.description}</span>
         </div>
     </div>
<div className='h-[30rem] relative min-w-[50%] flex  justify-center' >
    
     <img src={earth} alt="" className='max-w-[80%] absolute ' />
     <img src = {rocket} alt="" className='max-w-[30%] absolute left-28'/>
     <img src = {bg3d} alt="" className='max-w-[80%] absolute ' />
    
 </div>
    </div>

    <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='text-white md:text-3xl text-xl'>
        Courses to get you started
        </h2>
        <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
          <button onClick={()=>{setActiveOption(1)}}  className={activeOption===1? `px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer`:`px-4 py-2 text-richblack-50 cursor-pointer` }>Most Populer</button>
          <button onClick={()=>{setActiveOption(2)}} className={activeOption===1?'px-4 py-2 text-richblack-50 cursor-pointer':'px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer'}>New</button>
        </div>
        <CourseSlider Courses={CatalogPageData?.selectedCourses}/>        
    </div>

      <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl text-white'>
          Similar to {Catalog.catalog}
        </h2>
        {
          CatalogPageData?.differentCourses.length !== 0? (<CourseSlider Courses={CatalogPageData?.differentCourses}/>):
          (
            <div className='text-white text-center flex mx-auto'>No Similar Courses Found</div>
          )

        }
        
      </div>
      
      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl text-white'>
          Frequently Bought Together
          </h2>
          <div className='grid grid-cols-2 gap-3 lg:gap-6 lg:grid-cols-2 pr-4'>
            {
              CatalogPageData?.mostSellingCourses?.map((item,index)=>(
                <CatalogCard key={index} course={item}  Height={'lg:h-[250px] h-[100px]'} />
              ))
            }
          </div>
      </div>


      <div className='bg-[#202329] w-full h-[500px]'>
       <Footer/>
   </div>
     
    </>
  )
}

export default Catalog