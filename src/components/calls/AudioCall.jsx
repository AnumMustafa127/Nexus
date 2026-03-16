import React from 'react'
import {useEffect, useRef, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Send, Phone, Video, Info, Smile, Mic, MicOff, PhoneOff, Volume2, UserCircle2 } from 'lucide-react';
const AudioCall = () => {
    const [isActive, setisActive] = useState(false)
    const navigate = useNavigate()
    const localVideoRef = useRef()
    const location = useLocation()
    const name = location.state?.name
    const picture = location.state?.picture
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({video: false, audio: true})
      .then (stream => {
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play()
      })
      .catch (err => console.log('Audio access denied..'))
    }, [])
    

    function endCall() {
    if(localVideoRef.current && localVideoRef.current.srcObject){
        // Stop all tracks
        localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
        // Remove stream from video element
        localVideoRef.current.srcObject = null;
        // Remove ref (helps garbage collection)
        localVideoRef.current = null;
    }
    navigate(-1);    
}
 function muteBtn() {
        setisActive(!isActive)
        const Audiotrack = localVideoRef.current.srcObject.getAudioTracks()
        Audiotrack.forEach((track)=>{
                track.enabled = !track.enabled
        })
    }
    return (
        <>
            <div className='h-screen w-full bg-gray-600 border border-white flex justify-center items-center gap-8 flex-col'>
                <audio ref={localVideoRef}></audio>
                <div className='h-4/5 w-11/12  text-white  text-center pt-4 flex justify-center flex-col'>
                    <div>
                        <h2 className='font-bold'>{name}</h2>
                        <p>End-to-end encrypted</p>
                    </div>
                    <div className='m-auto '>
                        <img
                            className="w-56 h-56 rounded-full object-cover"
                            src={picture}
                            alt={name}
                        />
                    </div>
                </div>
                <nav className='h-16 rounded-lg w-4/5 border bg-gray-800 text-white border-white flex justify-evenly items-center'>

                    <button className='hover:bg-white hover:text-black rounded-full text-lg font-extrabold border-red border pr-3 pl-3 pt-1 pb-2'>...</button>

                    
                    <button onClick={muteBtn} className={`hover:bg-white ${isActive && 'bg-white text-black'} hover:text-black rounded-full text-lg font-extrabold border-red border p-3`}><MicOff size={25} /></button>

                    <button className='hover:bg-black hover:text-white rounded-full text-lg font-extrabold border-red border p-3 bg-white text-black'><Volume2 size={25} /></button>

                    <button onClick={endCall} className='hover:bg-white hover:text-red-500 hover:border-red-500 rounded-full text-lg font-extrabold border-red border p-3 bg-red-700'><PhoneOff size={25} /></button>

                </nav>
            </div>
        </>
    )
}

export default AudioCall