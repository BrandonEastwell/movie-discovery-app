'use client'
import React, {forwardRef, useState} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const WatchlistForm = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [description, setDesc] = useState<string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value);
    };

    const handleCreatePlaylist = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/watchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:name, desc:description}),
            });
            const data = await response.json()
            if (response.ok) {
                setMessage(data.message);
                setError(null);

            } else {
                setMessage(null);
                setError(data.error);
                console.error('Action failed:', data.error);
            }
        } catch (error : any) {
            console.error('Action failed:', error.response?.data);
        }
    };

    const handleVisibility = () => {
        setIsVisible(false); // Set visibility to false to remove the component
    };

    return (
        isVisible && (
            <div className="fixed w-[500px] min-h-[400px] h-auto bg-[#212121] justify-center top-1/3 left-1/2 mr-[-20vh] ml-[-15vw] rounded">
                <div className="flex w-full justify-end">
                    <button onClick={handleVisibility} className="m-1 bg-transparent cursor-pointer">
                        <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faXmark} size="xl"/>
                    </button>
                </div>
                <form className="content-wrapper w-[75%] flex flex-col m-auto text-center gap-4">
                    <p className="font-michroma text-silver text-[1rem] m-1 self-start">playlist name</p>
                    <div className="input-box w-full rounded bg-[#121212] py-3">
                        <input
                            className="w-full border-none outline-none font-michroma text-[1rem] text-silver bg-transparent pl-3"
                            type="text"
                            id="name"
                            placeholder=""
                            value={name}
                            onChange={handleNameChange}
                            required
                            maxLength={26}
                        />
                    </div>
                    <p className="font-michroma text-silver text-[1rem] m-1 self-start">playlist description</p>
                    <div className="input-box w-full rounded bg-[#121212] py-3">
                        <textarea
                            className="w-full resize-none border-none outline-none font-michroma text-[1rem] text-silver bg-transparent pl-3"
                            id="desc"
                            value={description}
                            onChange={handleDescChange}
                            required
                            cols={5}
                        />
                    </div>
                    <button
                        className="signup-btn w-full font-michroma bg-Purple text-pearl-white text-center rounded p-3 cursor-pointer"
                        type="submit" onClick={handleCreatePlaylist}>create playlist
                    </button>
                    <div className="message-handle w-full flex flex-col">
                        {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                        {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
                    </div>
                </form>
            </div>
        ))
});
WatchlistForm.displayName = 'WatchlistForm';

export default WatchlistForm;