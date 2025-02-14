'use client'
import React, { useContext, useEffect, useState } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '../../../context/SourceContext'
import { DestinationContext } from '../../../context/DestinationContext'
import CarListOption from './CarListOption'

function SearchSection() {
  const {source,setSource}=useContext(SourceContext)
  const {destination,setDestination}=useContext(DestinationContext)
  const [distance,setDistance]=useState()

  const calculateDistance=()=>{
    const dist=google.maps.geometry.spherical.computeDistanceBetween(
      {lat:source.lat,lng:source.lng},
      {lat:destination.lat,lng:destination.lng}
    )
    setDistance(dist*0.000621374)
  }

  useEffect(()=>{
if(source){
  console.log(source)
}
if(destination){
  console.log(destination)
}
  },[source,destination])

  return (
    <div>
    <div className='p-2 md:p-5 border-[2px] rounded-xl'>
    <p className='text-[20px] font-bold'>Get a ride</p>
    <InputItem type='source'/>
    <InputItem type='destination'/>
    <button className='p-3 bg-black w-full mt-5 text-white rounded-lg' onClick={()=>calculateDistance()}>Search</button>
    </div>
{distance&&<CarListOption distance={distance}/>}
    </div>
  )
}

export default SearchSection
