import React from "react";

export default function ContentContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="col-start-2 col-end-3 row-start-3 z-10 overflow-y-auto no-scrollbar scroll-smooth border-solid border bg-[#121212]/70 border-[#3E3E3E]/20 m-2 ml-1 mr-4 mb-0 p-6 pb-0 rounded-2xl rounded-b-none">
            {children}
        </div>
    )
}