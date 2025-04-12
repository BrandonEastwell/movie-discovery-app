"use client"
import React from "react";
import {handleAuthenticationReq} from "../../lib/api/client_requests/authentication";
import {useRouter} from "next/navigation";
import { motion } from "framer-motion";

interface FormSubmitButtonProps {
    username: string;
    password: string;
    action: "login" | "signup";
    text: string;
    setError: (res: { success: boolean; error: string; errorType: string; }) => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({username, password, action, text, setError})=> {
    const router = useRouter();
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const res : {success: boolean, error: string, errorType: string} = await handleAuthenticationReq(router, action, username, password);
        setError(res);
    }

    return (
        <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 1}} className="w-full font-iconsolata text-lg bg-Purple text-pearl-white text-center rounded-2xl p-3 cursor-pointer" type="submit" onClick={handleSubmit}>
            {text}
        </motion.button>
    )
}

export {FormSubmitButton}