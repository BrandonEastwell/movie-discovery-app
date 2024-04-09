import {cookies} from "next/headers";
import HeaderMenu from "../client/header-menu";
import {verify} from "jsonwebtoken";
const HeaderBar: React.FC = () => {
    let loggedIn: boolean = false;
    const token = cookies().get('token')?.value
    let username: string | null = null;

    if (token) {
        try {
            const decodedToken = verify(token, `${process.env.JWT_EXPIRES_IN}`) as {username: string} ;
            username = decodedToken.username;
            loggedIn = true;
            console.log(token)
        } catch (error) {
            console.error('Error decoding JWT token:', error)
        }
    }
        return (
                <div className="fixed w-full flex flex-row items-center justify-between mt-[-1rem] pt-0 px-[1.375rem] box-border font-vt323">
                    <div className="flex flex-col items-start px-0 pb-0 justify-center">
                        <h1 className="m-0 p-0 tracking-[0.31em] text-[3rem] text-[#5F43B2] text-center align-middle">
                            SIVTER
                        </h1>
                    </div>
                    <h1 className="m-0 p-0 flex flex-col justify-items-center items-center tracking-[0.20em] text-[5rem] text-center text-white font-michroma">
                        FILM
                    </h1>
                    <HeaderMenu loggedIn={loggedIn} username={username}></HeaderMenu>
                </div>
        );
};

export default HeaderBar;
