import HeaderMenu from "../client/header-menu";

const HeaderBar: React.FC = () => {
    return (
        <div className="fixed w-full flex flex-row items-center text-center align-middle justify-between mt-[-1rem] pt-0 px-[1.375rem] box-border font-vt323">
            <h1 className="flex justify-start m-0 p-0 tracking-[0.31em] text-[3rem] text-[#5F43B2] font-medium w-[33%]">
                SIVTER
            </h1>
            <h1 className="justify-center m-0 p-0 mx-auto tracking-[0.31em] text-[5rem] text-white font-michroma text-center font-medium w-[33%]">
                FILM
            </h1>
            <HeaderMenu></HeaderMenu>
        </div>
    );
};

export default HeaderBar;
