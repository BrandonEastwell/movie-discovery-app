'use client'
import React, {forwardRef, useState} from 'react';
import Link from "next/link";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {handleAuth} from "../../lib/api/clientSide/accounts";

interface formProps {
    action: "login" | "signup";
    isVisible: boolean;
    setIsVisible: () => void;
}

const AuthForm = forwardRef<HTMLDivElement, formProps>((props, ref) => {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [form, setForm] = useState(props.action);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    function formActionSignup() {
        setForm('signup');
    }

    function formActionLogin() {
        setForm('login');
    }

    return (
        props.isVisible && (
            <div ref={ref} className="fixed max-w-[500px] max-h-[500px] w-full h-full bg-black bg-opacity-90 top-1/3 left-1/2 mr-[-20vh] ml-[-15vw] rounded overflow-hidden">
                <div className="flex w-full justify-end">
                    <button onClick={props.setIsVisible} className="m-1 bg-transparent cursor-pointer">
                        <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faXmark} size="xl"/>
                    </button>
                </div>
                <form className="content-wrapper w-[75%] flex flex-col m-auto text-center gap-4">
                    <h1 className="w-full font-michroma text-[2rem] text-pearl-white font-light">{form === "login" ? "Sign In" : "Sign Up"}</h1>
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
                    </div>
                    <FormSubmitButton username={username} password={password} action={form}
                                      text={form === "login" ? "Sign In" : "Create Account"}
                                      setError={(e) => setError(e)} />
                    <div className="remember-forgot-box w-full flex flex-col gap-2">
                        { form === "login" &&
                            <>
                                <button onClick={formActionSignup} className="font-michroma cursor-pointer bg-transparent text-pearl-white text-[1rem] no-underline">Create account.</button>
                                <Link className="font-michroma text-silver text-[1rem] m-1 no-underline" href={''}>Forgot password?</Link>
                            </>
                        }

                        { form === "signup" &&
                            <>
                                <button onClick={formActionLogin} className="font-michroma cursor-pointer bg-transparent text-pearl-white text-[1rem] no-underline">Have an account?
                                </button>
                                <p className="font-michroma text-silver text-[1rem] m-1 whitespace-normal">
                                    Password requirements:
                                    - 1 Special Character
                                    - 8 Character Length
                                    - 1 Uppercase
                                </p>
                            </>
                        }
                        {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                        {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
                    </div>
                </form>
            </div>
        ))
});

interface FormSubmitButtonProps {
    username: string;
    password: string;
    action: "login" | "signup";
    text: string;
    setError: (e: string) => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({username, password, action, text, setError})=> {
    return (
        <button className="submit w-full font-michroma bg-Purple text-pearl-white text-center rounded p-3 cursor-pointer"
                type="submit" onClick={async (event) => {
                    const res = await handleAuth(event, action, username, password);
                    setError(res);
                }
        }>{text}
        </button>
    )
}

export default AuthForm;