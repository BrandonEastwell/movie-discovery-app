'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import useAuthForm from "../../../lib/hooks/useAuthForm";
import {FormSubmitButton} from "../../../components/client/form/FormSubmitButton";

export default function Page(){
    const router = useRouter();
    const {handleUsernameChange, handlePasswordChange, handleError,
        serverError, usernameError, passwordError, username, password, form} = useAuthForm('signup');

    const navigateToLogin = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        router.push('/login');
    };

    return (
        <div className="backdrop-blur-[20px] bg-white/10 rounded-2xl z-20 overflow-hidden">
            <div className="bg-midnight/90 p-15">
                <form className="flex flex-col text-center gap-4 py-10 px-20 place-self-center font-iconsolata">
                    <h1 className="text-center mb-2 text-4xl text-pearl-white font-bold">{"Join Today"}</h1>
                    <div className="rounded bg-[#121212] py-3 px-3 overflow-hidden">
                        <input
                            className="w-full border-none outline-none font-iconsolata text-lg text-silver bg-transparent"
                            type="username"
                            id="username"
                            placeholder="username"
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete={"off"}
                            required
                        />
                        {usernameError && <p className="font-iconsolata text-Purple text-lg m-1">{usernameError}</p>}
                    </div>
                    <div className="rounded bg-[#121212] py-3 px-3 overflow-hidden">
                        <input
                            className="w-full border-none outline-none font-iconsolata text-lg text-silver bg-transparent"
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete={"off"}
                            required
                        />
                        {passwordError && <p className="font-iconsolata text-Purple text-lg m-1">{passwordError}</p>}
                    </div>
                    <FormSubmitButton username={username} password={password} action={form}
                                      text={"Create Account"}
                                      setError={(res) => handleError(res)} />
                    <div className="w-full flex flex-col gap-1">
                        <button onClick={navigateToLogin} className="font-iconsolata cursor-pointer bg-transparent text-pearl-white text-lg no-underline">Have an account?</button>
                        {serverError && <p className="font-iconsolata text-red-800 text-lg m-1">{serverError}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}