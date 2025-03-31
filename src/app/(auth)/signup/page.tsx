'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {FormSubmitButton} from "../../../components/client/form/FormSubmitButton";

export default function Page(){
    const router = useRouter();
    const [message, setMessage] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    function handleError(res: { error: any; errorType: any; message: any; }) {
        if (res.errorType) {
            switch (res.errorType) {
                case "username":
                    setUsernameError(res.error)
                    break
                case "password":
                    setPasswordError(res.error)
                    break
                case "server":
                    setServerError(res.error)
                    break
            }
        } else {
            setMessage(res.message)
        }
    }

    const navigateToLogin = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        router.push('/login');
    };

    return (
        <form className="flex flex-col place-self-center text-center gap-4">
            <h1 className="w-full font-michroma text-[1.5rem] text-pearl-white font-light">Join Sivter Today</h1>
            <div className="input-box rounded bg-[#121212] py-3 px-3 overflow-hidden">
                <input
                    className="w-full border-none outline-none font-michroma text-[1rem] text-silver bg-transparent"
                    type="username"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete={"off"}
                    required
                />
                {usernameError && <p className="font-michroma text-Purple text-[1rem] m-1">{usernameError}</p>}
            </div>
            <div className="input-box rounded bg-[#121212] py-3 px-3 overflow-hidden">
                <input
                    className="w-full border-none outline-none font-michroma text-[1rem] text-silver bg-transparent"
                    type="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete={"off"}
                    required
                />
                {passwordError && <p className="font-michroma text-Purple text-[1rem] m-1">{passwordError}</p>}
            </div>
            <FormSubmitButton username={username} password={password} action={"signup"}
                              text={"Create Account"}
                              setError={(res) => handleError(res)} />
            <div className="remember-forgot-box w-full flex flex-col gap-1">
                <button onClick={navigateToLogin} className="font-michroma cursor-pointer bg-transparent text-pearl-white text-[1rem] no-underline">Have an account?</button>
                {serverError && <p className="font-michroma text-red-800 text-[1rem] m-1">{serverError}</p>}
            </div>
        </form>
    )
}