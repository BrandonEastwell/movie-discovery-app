"use client";
import React, {useState} from 'react';
import Link from "next/link";

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignup = () => {
        // You can add your authentication logic here
        if (username === 'yourUsername' && password === 'yourPassword') {
            alert('Login successful');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="grid grid-cols-layout grid-rows-layout">
            <form className="content-wrapper col-start-2 row-start-2">
                <h1>signup</h1>
                <label htmlFor="username">Username:</label>
                <div className="input-box">
                    <input
                        type="text"
                        id="username"
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <label htmlFor="password">Password:</label>
                <div className="input-box">
                    <input type={"text"}
                           id="password"
                           onChange={handlePasswordChange}
                           required
                    />
                </div>
                <div className="remember-forgot-box">
                    <label>
                        <input type={"checkbox"} />
                        remember me
                    </label>
                    <Link href={"./signup"}>forgot password</Link>
                </div>
                <button className="signup-btn" type={"submit"} onClick={handleSignup}>create account</button>
            </form>
        </div>
    )
};

export default SignupPage;