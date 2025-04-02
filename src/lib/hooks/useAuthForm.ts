import React, {useState} from "react";

const useAuthForm = (action: "login" | "signup") => {
    const [message, setMessage] = useState<string | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [form, setForm] = useState(action);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    function handleError(res: { success: boolean; error: string; errorType: string; }) {
        if (!res.success) {
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
            setMessage(`Successful ${action}`)
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

    return {handleUsernameChange, handlePasswordChange, handleError, formActionSignup, formActionLogin, serverError, usernameError, passwordError, username, password, form}
}

export default useAuthForm