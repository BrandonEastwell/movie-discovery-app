import HeaderBar from "../../../components/layout/HeaderBar";
import React, {Suspense} from "react";
import AccountNavigation from "../../../components/layout/AccountNavigation";
import {AuthService} from "../../../lib/services/authService";
import {redirect} from "next/navigation";

export default async function AccountLayout({children}: { children: React.ReactNode }) {
    const {isLoggedIn, userData} = await AuthService.getAuthState();

    if (userData?.userid) {
        return (
            <>
                <div className="col-start-1 col-end-3 row-start-1 z-10 px-6 my-3">
                    <HeaderBar isLoggedIn={isLoggedIn} userData={userData}/>
                </div>
                <div className="col-start-1 col-end-2 row-start-3 z-10 border-solid border bg-[#121212]/70 border-[#3E3E3E]/20 m-2 mr-1 mb-0 p-4 pb-0 rounded-2xl rounded-b-none">
                    <AccountNavigation userid={userData?.userid} />
                </div>
                <div className="col-start-2 col-end-3 row-start-3 z-10 overflow-y-auto no-scrollbar scroll-smooth border-solid border bg-[#121212]/70 border-[#3E3E3E]/20 m-2 ml-1 mr-4 mb-0 p-6 pb-0 rounded-2xl rounded-b-none">
                    <Suspense fallback={<p>loading..</p>}>
                        {children}
                    </Suspense>
                </div>
            </>
        )
    } else {
        redirect('/auth/login');
    }
}
