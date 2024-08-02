import React from 'react'
import RenderSteps from './RenderSteps'
const AddCourse = () => {
  return (
    <div className='w-8/12 mx-auto mt-5 p-5 flex flex-col'>
            <div className='text-white text-3xl'>Add Course</div>

            <div className='mt-10 '>
                <RenderSteps/>
            </div>



    </div>
  )
}

export default AddCourse