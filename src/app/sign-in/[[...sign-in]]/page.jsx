import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return(
    <div>
    <Image alt="" src='/banner.jpg' height={1000} width={980} className='object-cover h-full w-full'/>
    <div className='absolute right-0 top-0'>
      <SignIn />
    </div>
    </div> 
)
}