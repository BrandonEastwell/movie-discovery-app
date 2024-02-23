"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('/apis/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (response.ok) {
                // Redirect to dashboard or another protected route
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
            }
        } catch (error : any) {
            console.error('Login failed:', error.response?.data);
        }
    };

    return (
        <div className="fixed w-[30vw] h-[40vh] bg-midnight bg-opacity-50 justify-center top-1/3 left-1/2 mr-[-20vh] ml-[-15vw]">
            <form className="content-wrapper">
                <h1>signup</h1>
                <label htmlFor="username">Username:</label>
                <div className="input-box">
                    <input
                        type="username"
                        id="username"
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <label htmlFor="password">Password:</label>
                <div className="input-box">
                    <input
                        type="password"
                        id="password"
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="remember-forgot-box">
                    <label>
                        <input type={"checkbox"}/>
                        remember me
                    </label>
                    <Link href={"./signup"}>forgot password</Link>
                </div>
                <button className="signup-btn" type="submit" onClick={handleLogin}>create account</button>
            </form>
        </div>
    )
};

export default LoginPage;