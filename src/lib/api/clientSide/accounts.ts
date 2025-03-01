import React from "react";
import {router} from "next/client";
const  {NEXT_PUBLIC_API_URL} = process.env;

const handleAuth = async (e: React.FormEvent, action: "login" | "signup", username: string, password: string) => {
    e.preventDefault()
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, password:password}),
        });

        const data = await response.json()

        if (response.ok) {
            // Redirect to dashboard
            return router.push(`/account/${data.userid}`);
        } else {
            console.error(`${action} Failed: `, data.error);
            return data.error
        }
    } catch (error : any) {
        console.error(`${action} Failed: `, error.response?.data);
    }
};

export {handleAuth}