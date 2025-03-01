import React from "react";
import {router} from "next/client";

const handleAuth = async (e: React.FormEvent, action: "login" | "signup", username: string, password: string) => {
    e.preventDefault()
    try {
        const response = await fetch(`/api/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, password:password}),
        });

        const data = await response.json()

        if (response.ok) {
            // Redirect to dashboard
            console.log(data.message);
            return router.push(`/account/${data.userid}`);
        } else {
            console.error(`${action} failed: `, data.error);
            return data.error;
        }
    } catch (error : any) {
        console.error(`${action} failed: `, error.response?.data);
    }
};

export {handleAuth}