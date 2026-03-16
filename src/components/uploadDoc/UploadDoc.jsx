import React, { useState } from 'react'
import { FileAudio2, Upload } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
const UploadDoc = () => {
    const [file, setfile] = useState(null)
    const navigate = useNavigate()
    function uploadFunct(e) {
        const update = e.target.files[0];
        setfile(update);

        const fileData = {
            id: Date.now(),
            name: update.name,
            size: update.size,
            type: update.type || 'File',
            lastModified: 'just now',
            shared: false,
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        };

        const data = JSON.parse(localStorage.getItem('uploaded-File')) || []
        data.push(fileData);
        localStorage.setItem('uploaded-File', JSON.stringify(data))
        navigate(-1)
       
    }
    return (
        <main className=' h-screen w-full flex justify-center items-center bg-gray-400'>
            <div className='flex-col flex justify-evenly items-center h-2/3 w-2/3 shadow-2xl shadow-gray-600 border-2 rounded-md border-gray-600 bg-white'>
                <h2 className='text-gray-400 text-2xl font-bold '>Upload Document</h2>
                <input
                    type='file'
                    placeholder='Upload File'
                    onChange={uploadFunct} className='flex bg-blue-500 p-3 gap-2 rounded-lg text-white font-serif border border-gray-500'
                    accept='.pdf, .doc, .docx'
                />
            </div>
        </main>
    )
}

export default UploadDoc