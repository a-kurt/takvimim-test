import React from 'react'
import {ReactComponent as HeroImg} from '/home/atakan/Desktop/Takvimim/takvimim/src/images/undraw_date_picker_re_r0p8.svg'
import Login from '../components/Login'


const Hero = () => {
  return (
    <div className='max-w-[1920px] h-screen'>
        <div className="absolute top-0 left-0 w-full">
            <h1 className='text-blue-500 font-bold text-3xl md:text-5xl px-4 py-4'>TAKVİMİM</h1>
        </div>
        
        <div className="flex justify-center items-center h-full">
            <div className="w-1/2 hidden md:block">
                <HeroImg className="lg:ml-32 md:h-96 md:w-96 lg:w-5/6 lg:h-5/6"/>
            </div>
            <div className="md:w-1/2 mb-24 w-full">
                <Login />
            </div>
        </div>
    </div>
  )
}

export default Hero