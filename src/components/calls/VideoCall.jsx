import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Send, Phone, Video, Info, Smile, Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react';
const VideoCall = () => {
    const [isActive, setisActive] = useState(false)
    const [videoActive, setvideoActive] = useState(false)
    const location = useLocation()
    const name = location.state?.name
    const navigate = useNavigate()
    const localVideoRef = useRef();
    useEffect(() => {
        // Access camera and mic
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideoRef.current.srcObject = stream;
                localVideoRef.current.play();
            })
            .catch(err => console.error("Camera access error:", err));
    }, []);

    function endCall() {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
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
    function videoOff() {
        setvideoActive(!videoActive)
        const Videotrack = localVideoRef.current.srcObject.getVideoTracks()
        Videotrack.forEach((track)=>{
            track.enabled=!track.enabled
        })
    }
    return (
        <>
            <div className='h-screen w-full bg-gray-600 border border-white flex justify-center items-center gap-8 flex-col'>
                <div className='h-4/5 w-11/12 border border-black text-white bg-gray-800 text-center pt-4 flex flex-col gap-2'>
                    <div>
                        <h2 className='font-bold'>{name}</h2>
                        <p>End-to-end encrypted</p>
                    </div>
                    <video className='m-auto min-w-full min-h-96' ref={localVideoRef} autoPlay></video>
                </div>
                <nav className='h-16 rounded-lg w-4/5 border bg-black text-white border-white flex justify-evenly items-center'>
                    <button className='hover:bg-white hover:text-black rounded-full text-lg font-extrabold border-red border pr-3 pl-3 pt-1 pb-2'>...</button>

                    <button onClick={videoOff} className={`hover:bg-white ${videoActive && 'bg-white text-black'} hover:text-black rounded-full text-lg font-extrabold border-red border p-3`}><Video size={25} /></button>

                    <button onClick={muteBtn} className={`hover:bg-white  hover:text-black ${isActive && 'bg-white text-black'} rounded-full text-lg font-extrabold border-red border p-3`}><MicOff size={25} /></button>

                    <button className='hover:bg-black hover:text-white rounded-full text-lg font-extrabold border-red border p-3 bg-white text-black'><Volume2 size={25} /></button>

                    <button onClick={endCall} className='hover:bg-white hover:text-red-500 hover:border-red-500 rounded-full text-lg font-extrabold border-red border p-3 bg-red-700'><PhoneOff size={25} /></button>

                </nav>
            </div>
        </>
    )
}

export default VideoCall