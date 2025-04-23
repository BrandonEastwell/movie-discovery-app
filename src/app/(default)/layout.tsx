import React from "react";
import HeaderBar from "../../components/layouts/HeaderBar";
import UserNavigation from "../../components/layouts/UserNavigation";
import {AuthService} from "../../lib/services/authService";
import "../globals.css"
import HeaderContainer from "../../components/layouts/HeaderContainer";
import NavContainer from "../../components/layouts/NavContainer";
import ContentContainer from "../../components/layouts/ContentContainer";

export default async function DefaultLayout({children}: { children: React.ReactNode }) {
    const { isLoggedIn, userData } = (await AuthService.getAuthState());

    return (
        <>
            <HeaderContainer>
                <HeaderBar isLoggedIn={isLoggedIn} userData={userData}/>
            </HeaderContainer>
            <NavContainer>
                <UserNavigation/>
            </NavContainer>
            <ContentContainer>
                {children}
            </ContentContainer>
        </>
    )
}
