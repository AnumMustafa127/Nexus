import React, { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const Signpad = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const sign = useRef(null)
    function clearfunct() {
        sign.current.clear()
    }
    function savefunct() {
        sign.current.toDataURL() 
        const docStatus = {
            id: Number(id), 
            signStatus: true
        }
        const file = JSON.parse(localStorage.getItem('docStatus')) || []
        file.push(docStatus)
        localStorage.setItem('docStatus', JSON.stringify(file))
        navigate(-1)
    }
    return (
        <div className='flex gap-3 flex-col justify-center items-center bg-gray-400 h-screen w-full'>
            <h2 className='text-2xl font-mono '>Draw your Signature</h2>
            <SignatureCanvas ref={sign}
                penColor='black'
                canvasProps={{
                    height: 500,
                    width: 600,
                    className: 'border border-black cursor-pointer shadow-lg shadow-black'
                }}
            />
            <div className='flex gap-2'>
                <button className='bg-gray-600 border border-gray-300 text-gray-300 p-2 rounded-lg' onClick={clearfunct}>Clear Signature</button>
                <button className='bg-gray-600 border border-gray-300 text-gray-300 p-2 rounded-lg' onClick={savefunct}>Save Signature</button>
            </div>
        </div>

    )
}

export default Signpad