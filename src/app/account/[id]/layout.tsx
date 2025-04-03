import HeaderBar from "../../../components/server/header-bar";
import SearchBar from "../../../components/client/search-bar";
import React, {Suspense} from "react";
import AccountNavigation from "../../../components/client/AccountNavigation";
import {AuthService} from "../../../lib/services/authService";
import {redirect} from "next/navigation";

export default async function AccountLayout({children}: { children: React.ReactNode }) {
    const {isLoggedIn, userData} = await AuthService.getAuthState();

    if (userData?.userid) {
        return (
            <>
                <div className="col-start-1 col-end-3 row-start-1 z-10 px-6">
                    <HeaderBar isLoggedIn={isLoggedIn} userData={userData}/>
                </div>
                <div className="col-start-1 col-end-3 row-start-2 z-10 px-6 py-2">
                    <SearchBar/>
                </div>
                <div className="col-start-1 col-end-2 row-start-3 z-10 px-6">
                    <AccountNavigation userid={userData?.userid} />
                </div>
                <div className="col-start-2 col-end-3 row-start-3 z-10 overflow-y-auto no-scrollbar scroll-smooth">
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
