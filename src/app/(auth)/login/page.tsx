'use client'
import React, {useRef, useState} from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";

const LoginPage: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const formRef = useRef<HTMLDivElement>(null);
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
            const response = await fetch('api/login', {
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
                console.error('Login failed:', data.error);
            }
        } catch (error : any) {
            console.error('Login failed:', error.response?.data);
        }
    };

    return (
        <div ref={formRef}  className="fixed w-[500px] h-[500px] bg-black bg-opacity-75 justify-center top-1/3 left-1/2 mr-[-20vh] ml-[-15vw] rounded">
            <form className="content-wrapper w-[75%] flex flex-col m-auto text-center gap-4">
                <h1 className="w-full font-michroma text-[3rem] text-pearl-white font-light">Sign In</h1>
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
                <button className="signup-btn w-full font-michroma bg-Purple text-pearl-white text-center rounded p-3" type="submit" onClick={handleLogin}>Sign In</button>
                <div className="remember-forgot-box w-full flex flex-col">
                    <p className="font-michroma text-silver text-[1rem] m-1">New here? <Link href={"./signup"} className="font-michroma text-pearl-white text-[1rem] no-underline">Create an account.</Link></p>
                    <p className="font-michroma text-silver text-[1rem] m-1">Forgot password? <Link href={""} className="font-michroma text-pearl-white text-[1rem] no-underline">Reset password.</Link></p>
                    {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                    {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
                </div>
            </form>
        </div>
    )
};

export default LoginPage;