'use client'
import { CarListData } from '../../utils/CarListData'
import React, { useState } from 'react'
import CarListItem from './CarListItem'
import { useRouter } from 'next/navigation'

const CarListOption = ({distance}) => {
  const [activeIndex,setActiveIndex]=useState()
  const [activeCar,setActiveCar]=useState()
  const router=useRouter();
  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
        <h2 className='text-[22px] font-bold'>Reccommended</h2>
        {CarListData.map((item,index)=>(
            <div key={item.id} className={`cursor-pointer rounded-md p-2 px-4 border-black ${activeIndex==index?'border-[3px]':null}`} onClick={()=>{setActiveIndex(index);
            setActiveCar(item)}}>
                <CarListItem car={item} distance={distance}/>
            </div>
        ))}

       {activeCar?.name&& <div className='flex justify-between fixed bottom-5 bg-white shadow-xl rounded-lg p-3 w-full md:w-[30%] border-[1px] items-center'>
          <h2>Make Payment For</h2>
          <button className='text-center rounded-lg p=3 bg-black text-white' onClick={()=>router.push('/payment?amount='+(activeCar.amount*distance).toFixed(2))}>Request &nbsp; {activeCar.name}</button>
        </div>}
    </div>
  )
}

export default CarListOption