"use client";
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const SignupForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(password);
        console.log(username);
        try {
            const response = await fetch('api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username:username, password:password }),
            });
            if (response.ok) {
                // Redirect to dashboard or another protected route
                console.log("SignupForm successful")
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                console.error('SignupForm failed:', errorData);
            }
        } catch (error : any) {
            console.error('LoginForm failed:', error.response?.data);
        }
    };

    return (
        <div className="flex flex-col justify-center max-w-[500px] max-h-[500px] w-[25vw] h-[50vh] opacity-50 bg-black font-michroma text-base text-pearl-white rounded">
            <form className="form-container flex flex-col w-full h-full" onSubmit={handleSignup}>
                <h1 className="text-[2.5rem]">create account</h1>
                <div className="input-box bg-gray-200 rounded">
                    <input
                        className="text-spun-pearl"
                        type="text"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="input-box bg-gray-200 rounded">
                    <input type="text"
                           className="text-spun-pearl"
                           id="password"
                           placeholder="password"
                           value={password}
                           onChange={handlePasswordChange}
                           required
                    />
                </div>
                <button className="signup-btn bg-Purple rounded" type="submit">create account</button>
                <div className="remember-forgot-box">
                    <p>Already have an account? <button>Login here.</button></p>
                </div>
                <div className="requirements-container">
                    <p>requirements</p>
                    <p>password length of 8</p>
                    <p>1 special character</p>
                    <p>1 uppercase character</p>
                </div>
            </form>
        </div>
    )
};

export default SignupForm;