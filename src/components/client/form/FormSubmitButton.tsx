import React from "react";
import {handleAuth} from "../../../lib/api/client/authentication";

interface FormSubmitButtonProps {
    username: string;
    password: string;
    action: "login" | "signup";
    text: string;
    setError: (e: { error: string; errorType: string; message: string}) => void;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({username, password, action, text, setError})=> {
    return (
        <button className="submit w-full font-iconsolata text-lg bg-Purple text-pearl-white text-center rounded-2xl p-3 cursor-pointer"
                type="submit" onClick={async (event) => {
            const res : {error: string, errorType: string, message: string} = await handleAuth(event, action, username, password);
            setError(res);
        }
        }>{text}
        </button>
    )
}

export {FormSubmitButton}