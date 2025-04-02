import React from "react";

export default async function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <div className="col-start-1 col-end-3 row-start-3 place-items-center z-10 bg-transparent overflow-y-auto no-scrollbar scroll-smooth">
                <h1 className="text-center m-7 text-9xl text-[#5F43B2] font-vt323 font-semibold">
                    SIVTER
                </h1>
                {children}
            </div>
        </>
    )
}
