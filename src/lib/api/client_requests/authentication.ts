import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleAuthenticationReq = async (router: AppRouterInstance, action: "login" | "signup", username: string, password: string) => {
    try {
        const response = await fetch(`/api/auth/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username:username, password:password}),
        });

        const data = await response.json()

        if (data.success) {
            // Redirect to dashboard
            router.push(`/account/${data.userid}`);
            return data;
        } else {
            console.error(`${action} failed: `, data.error);
            return data;
        }
    } catch (error : any) {
        console.error(`${action} failed: `, error);
    }
};

export {handleAuthenticationReq}