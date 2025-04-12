import React from "react";

export default function NavContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="col-start-1 col-end-2 row-start-3 z-10 border-solid border bg-[#121212]/70 border-[#3E3E3E]/20 m-2 mr-1 mb-0 p-4 pb-0 rounded-2xl rounded-b-none">
            {children}
        </div>
    )
}