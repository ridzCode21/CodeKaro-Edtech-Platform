import React from 'react'
import { Pie,Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import chroma from 'chroma-js';
const DashboardChart = ({details,currentChart}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const randomColor = (num)=>{
        const color = []
        for(let i = 0 ; i<num;i++){
             color.push(chroma.random().saturate(1).brighten(1.5).hex())
        }
        return color
    }
   const studentData = {
      labels: details?.map(course => course?.courseName),
      datasets:[
        {
            label: 'Enrolled Students',
            data: details?.map(course => course?.totalStudents),
            backgroundColor: randomColor(details?.length),
            borderWidth: 1,
        }
      ]
    }

    const RevenueData = {
        labels: details?.map(course => course?.courseName),
        datasets:[
          {
              label: 'Earnings Rs',
              data: details?.map(course => course?.totalRevenue),
              backgroundColor: randomColor(details?.length),
              borderWidth: 1,
          }
        ]
      }

  return (
<>
   {  currentChart === 'revenue'? 
    (
        <Doughnut data={RevenueData}
        options={
            {
                plugins:{
                    legend:{
                        position:'right',
                        labels:{    
                            
                            boxHeight:20,
                            boxWidth:20,
                            padding:20
                        }
                    }
                }
            }
        }
        />

    )
    :
    (<Doughnut data={studentData}
        options={
            {
                plugins:{
                    legend:{
                        position:'right',
                        labels:{    
                            
                            boxHeight:20,
                            boxWidth:20,
                            padding:20
                        }
                    }
                }
            }
        }
    />)
      
   }
      </>
  )
}

export default DashboardChart