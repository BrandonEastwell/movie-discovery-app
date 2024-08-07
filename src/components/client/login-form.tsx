'use client'
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoginForm = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username:username, password:password}),
            });
            const data = await response.json()
            if (response.ok) {
                // Redirect to dashboard or another protected route
                console.log('LOGIN FORM Request Headers:', response.headers);
                setMessage(data.message);
                setError(null);
                router.push(`/account/${data.userid}`);
            } else {
                setMessage(null);
                setError(data.error);
                console.error('Login failed:', data.error);
            }
        } catch (error : any) {
            console.error('Login failed:', error.response?.data);
        }
    };

    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            // Check if the clicked element is not part of the login.tsx form
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutSideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutSideClick);
        };
    }, []);

    const handleVisibility = () => {
        setIsVisible(false); // Set visibility to false to remove the component
    };

    return (
        isVisible && (
            <div ref={formRef}
                 className="fixed w-[500px] h-[500px] bg-black bg-opacity-75 justify-center top-1/3 left-1/2 mr-[-20vh] ml-[-15vw] rounded">
                <div className="flex w-full justify-end">
                    <button onClick={handleVisibility} className="m-1 bg-transparent cursor-pointer">
                        <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faXmark} size="xl"/>
                    </button>
                </div>
                <form className="content-wrapper w-[75%] flex flex-col m-auto text-center gap-4">
                    <h1 className="w-full font-michroma text-[3rem] text-pearl-white font-light">Sign In</h1>
                    <div className="input-box w-full rounded bg-[#121212] py-3">
                        <input
                            className="w-full border-none outline-none font-michroma text-[1rem] text-silver bg-transparent pl-3"
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
                            className="w-full border-none outline-none font-michroma text-[1rem] text-silver bg-transparent pl-3"
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button className="signup-btn w-full font-michroma bg-Purple text-pearl-white text-center rounded p-3"
                            type="submit" onClick={handleLogin}>Sign In
                    </button>
                    <div className="remember-forgot-box w-full flex flex-col">
                        <p className="font-michroma text-silver text-[1rem] m-1">New here?
                            <Link href={"./signup"} className="font-michroma text-pearl-white text-[1rem] no-underline">Create an account.</Link></p>
                        <p className="font-michroma text-silver text-[1rem] m-1">Forgot password?
                            <Link href={""} className="font-michroma text-pearl-white text-[1rem] no-underline">Reset password.</Link>
                        </p>
                        {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                        {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
                    </div>
                </form>
            </div>
        ))
});
LoginForm.displayName = 'LoginForm';
export default LoginForm;