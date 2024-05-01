import React, { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";

function CreateBook() {
    // const [bookName, setBookName] = useState("Your book name");
    const [photoName, setPhotoName] = useState("No file chosen");
    // const [bulletinBoard, setBulletinBoard] = useState("Enter group announcement here...");
    const [file, setFile] = useState(null);
    const bookNameRef = useRef(null);
    const bulletinBoardRef = useRef(null);
    
    function handleFileChange(e) {
        setFile(e.target.files[0]);
        setPhotoName(e.target.files[0].name);
    }

    function handleSubmit(e) {
        e.preventDefault(); // avoid execute default action
        const newBook = {
            BookName: bookNameRef.current.value,
            PhotoName: photoName,
            BulletinBoard: bulletinBoardRef.current.value,
            File: file
        };
        console.log(newBook);
    }

    return (
        <form className='mx-[12%] mt-[8%] mb-[16%] bg-gray-light rounded-2xl px-[6%] py-[4%]' onSubmit={handleSubmit}>
            <p className='text-4xl font-bold text-[#EE7214] py-[2%]'>Create New Account Book</p>
            <div className='flex mx-[8%] my-[2%]'>
                <div className='flex flex-col justify-start w-1/2'>
                    <label className='text-lg font-bold'>Book Name</label>
                    <input className='bg-gray rounded-md px-2 py-1 w-1/2' type="text" placeholder="Your book name" ref={bookNameRef} />
                </div>
                <div className='flex flex-col justify-start w-1/2'>
                    <label className='text-lg font-bold'>Book Photo</label>
                    <div className="flex items-center h-full">
                        <input className="px-2 py-1 bg-gray rounded-md" type="text" value={photoName} placeholder="No file chosen" readOnly />
                        <label className="ml-2 bg-transparent rounded cursor-pointer">
                            <FiUpload className="w-4 h-4" />
                            <input type="file" className="hidden" onClick={handleFileChange} />
                        </label>
                    </div>
                </div>
            </div>
            <div className='flex mx-[8%] my-[2%]'>
                <div className='flex flex-col w-full'>
                    <label className='text-lg font-bold'>Bulletin Board</label>
                    <textarea className="bg-gray rounded-md p-2"
                        type="text" ref={bulletinBoardRef} placeholder="Enter group announcement here..."
                        rows="4" // Sets the visible number of lines in the textarea
                        cols="50" // Sets the visible width of the textarea
                    />
                </div>
            </div>
            <div className='flex justify-end my-[2%]'>
                <button className='text-md font-bold text-[#FFFFFF] bg-[#EE7214] rounded-md px-3 py-1' type="submit">Create</button>
            </div>
        </form>
    )
}

export default CreateBook;
