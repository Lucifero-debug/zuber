import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api'
import { DestinationContext } from '../../../context/DestinationContext'
import { SourceContext } from '../../../context/SourceContext'

function GoogleMapSection() {

  const {source,setSource}=useContext(SourceContext)
  const {destination,setDestination}=useContext(DestinationContext)
  const [map, setMap] = React.useState(null)
  const [directionRoutesPoints,setDirectionRoutesPoints]=useState([])

  const containerStyle = {
    width: '100%',
    height: window.innerWidth*0.4,
  }
  
  const [center,setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  })
  useEffect(()=>{
if(source?.length!=[]&&map){

map.panTo(
{
  lat:source.lat,
    lng:source.lng 
}
)

  setCenter({
    lat:source.lat,
    lng:source.lng
  })
}
if(destination?.length!=[]&&map){
  setCenter({
    lat:destination.lat,
    lng:destination.lng
  })
}
if(source.length!=[] && destination.length!=[]){
  directionRoute()
}
  },[source,destination])

const directionRoute=()=>{
  const DirectionsService=new google.maps.DirectionsService();
  DirectionsService.route({
    origin:{lat:source.lat,lng:source.lng},
    destination:{lat:destination.lat,lng:destination.lng},
    travelMode:google.maps.TravelMode.DRIVING
  },(result,status)=>{
if(status===google.maps.DirectionsStatus.OK){
  setDirectionRoutesPoints(result)
}else{
  console.error('Error')
}
  })
}

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return  (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId:'7144149519aefb01'}}
    >
      {source.length!=[]?<MarkerF 
      position={{lat:source.lat,lng:source.lng}}
        icon={{
          url:'/source.png',
          scaledSize:{
            width:20,
            height:20
          }
        }}
      >
          <OverlayViewF position={{lat:source.lat,lng:source.lng}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='p-2 bg-white font-bold inline-block'>
            <p className='text-black text-[18px]'>
              {source.label}
            </p>
          </div>
        </OverlayViewF>
      </MarkerF>:null}
      {destination.length!=[]?<MarkerF 
      position={{lat:destination.lat,lng:destination.lng}}
        icon={{
          url:'/dest.png',
          scaledSize:{
            width:20,
            height:20
          }
        }}
      >
        <OverlayViewF position={{lat:destination.lat,lng:destination.lng}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='p-2 bg-white font-bold inline-block'>
            <p className='text-black text-[18px]'>
              {destination.label}
            </p>
          </div>
        </OverlayViewF>
      </MarkerF>:null}
      <DirectionsRenderer
        directions={directionRoutesPoints}
        options={{
suppressMarkers:true,
polylineOptions:{
  strokeColor:'#000',
  strokeWeight:5
}
        }}
      />
    </GoogleMap>
  ) 
}

export default GoogleMapSection
