'use client'
import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/navigation";

const SignupForm: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter()
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username:username, password:password}),
            });
            const data = await response.json()
            if (response.ok) {
                // Redirect to dashboard or another protected route
                setMessage(data.message);
                setError(null);
                router.push(`/account/${data.userid}`);
            } else {
                setMessage(null);
                setError(data.error);
                console.error('Signup failed:', data.error);
            }
        } catch (error : any) {
            console.error('Signup failed:', error.response?.data);
        }
    };

    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            // Check if the clicked element is not part of the login form
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutSideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutSideClick);
        };
    }, []);

    return (
        <div ref={formRef} className="${isVisible ? visible : invisible} fixed w-[500px] h-[500px] bg-black bg-opacity-75 justify-center top-1/3 left-1/2 mr-[-20vh] ml-[-15vw] rounded">
            <form className="content-wrapper w-[75%] flex flex-col m-auto text-center gap-4">
                <h1 className="w-full font-michroma text-[3rem] text-pearl-white font-light">Create Account</h1>
                <div className="input-box w-full rounded bg-[#121212] py-3">
                    <input
                        className="w-full font-michroma text-[1rem] text-silver bg-transparent pl-3"
                        type="username"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="input-box w-full rounded bg-[#121212] py-3">
                    <input
                        className="w-full font-michroma text-[1rem] text-silver bg-transparent pl-3"
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button className="signup-btn w-full font-michroma bg-Purple text-pearl-white text-center rounded p-3"
                        type="submit" onClick={handleSignup}>Create Account
                </button>
                <div className="remember-forgot-box w-full flex flex-col">
                    <p className="font-michroma text-silver text-[1rem] m-1 whitespace-normal">
                        Password requirements:
                        - 1 Special Character
                        - 8 Character Length
                        - 1 Uppercase
                    </p>
                    {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                    {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
                </div>
            </form>
        </div>
    )
};

export default SignupForm;