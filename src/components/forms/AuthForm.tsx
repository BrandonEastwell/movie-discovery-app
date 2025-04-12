'use client'
import React from 'react';
import {FormSubmitButton} from "./FormSubmitButton";
import useAuthForm from "../../lib/hooks/useAuthForm";
import {AnimatePresence, motion} from "framer-motion";

interface formProps {
    action: "login" | "signup";
}

const AuthForm = ((props: formProps) => {
    const {handleUsernameChange, handlePasswordChange, handleError, formActionSignup, formActionLogin, serverError, usernameError, passwordError, username, password, form} = useAuthForm(props.action);

    return (
        <form className="flex flex-col text-center gap-4 px-20 py-10 place-self-center font-iconsolata">
            <h1 className="text-center mb-2 text-4xl text-pearl-white font-bold">{form === "login" ? "Sign in to Sivter" : "Join Sivter Today"}</h1>
            <div className="rounded bg-[#121212] py-3 px-3 overflow-hidden">
                <input className="w-full border-none outline-none font-iconsolata text-lg text-silver bg-transparent"
                    type="username"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete={"off"}
                    required
                />
            </div>
            <div className="rounded bg-[#121212] py-3 px-3 overflow-hidden">
                <input className="w-full border-none outline-none font-iconsolata text-lg text-silver bg-transparent"
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
                              setError={(res) => handleError(res)} />
            {usernameError &&
                <AnimatePresence>
                    <motion.p initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}}
                              className="font-iconsolata text-red-800 text-lg m-0">{usernameError}</motion.p>
                </AnimatePresence>
            }
            {passwordError &&
                <AnimatePresence>
                    <motion.p initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} className="font-iconsolata text-red-800 text-lg m-0">{passwordError}</motion.p>
                </AnimatePresence>
            }
            <div className="w-full flex flex-col gap-1">
                {form === "login" &&
                    <p className="font-iconsolata bg-transparent text-silver text-lg no-underline">Dont have an account? <button onClick={formActionSignup} className="font-iconsolata cursor-pointer bg-transparent text-pearl-white text-lg no-underline">Create account</button></p>
                }
                {form === "signup" &&
                    <button onClick={formActionLogin} className="font-iconsolata cursor-pointer bg-transparent text-pearl-white text-lg no-underline">Have an account?</button>
                }
                {serverError &&
                    <AnimatePresence>
                        <motion.p initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} className="font-iconsolata text-red-800 text-lg m-1">{serverError}</motion.p>
                    </AnimatePresence>
                }
            </div>
        </form>
    )
});

export default AuthForm;