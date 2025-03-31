'use client'
import React, {forwardRef, useState} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FormSubmitButton} from "./form/FormSubmitButton";

interface formProps {
    action: "login" | "signup";
    isVisible: boolean;
    setIsVisible: () => void;
}

const AuthForm = forwardRef<HTMLDivElement, formProps>((props, ref) => {
    const [message, setMessage] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [form, setForm] = useState(props.action);

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

    function resetErrors() {
        setServerError(null);
        setPasswordError(null);
        setUsernameError(null);
    }

    function formActionSignup() {
        setForm('signup');
        resetErrors();
    }

    function formActionLogin() {
        setForm('login');
        resetErrors();
    }

    return (
        props.isVisible && (
            <div ref={ref} className="fixed max-w-[500px] max-h-[500px] w-full h-full bg-black bg-opacity-95 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20 overflow-hidden">
                <div className="flex w-full justify-end">
                    <button onClick={props.setIsVisible} className="bg-transparent cursor-pointer my-4 mx-4">
                        <FontAwesomeIcon className="text-pearl-white" icon={faXmark} size="xl"/>
                    </button>
                </div>
                <form className="content-wrapper w-[75%] flex flex-col m-auto text-center gap-4">
                    <h1 className="w-full font-michroma text-[1.5rem] text-pearl-white font-light">{form === "login" ? "Sign in to Sivter" : "Join Sivter Today"}</h1>
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
                    <FormSubmitButton username={username} password={password} action={form}
                                      text={form === "login" ? "Sign In" : "Create Account"}
                                      setError={(res) => handleError(res)} />
                    <div className="remember-forgot-box w-full flex flex-col gap-1">
                        { form === "login" &&
                            <>
                                <button className="font-michroma cursor-pointer text-pearl-white bg-transparent text-[1rem] no-underline">Forgot password?</button>
                                <p className="font-michroma bg-transparent text-silver text-[1rem] no-underline">Don't have an account? <button onClick={formActionSignup} className="font-michroma cursor-pointer bg-transparent text-pearl-white text-[1rem] no-underline">Create account.</button></p>
                            </>
                        }
                        { form === "signup" &&
                            <>
                                <button onClick={formActionLogin} className="font-michroma cursor-pointer bg-transparent text-pearl-white text-[1rem] no-underline">Have an account?</button>
                            </>
                        }
                        {serverError && <p className="font-michroma text-red-800 text-[1rem] m-1">{serverError}</p>}
                    </div>
                </form>
            </div>
        ))
});

export default AuthForm;