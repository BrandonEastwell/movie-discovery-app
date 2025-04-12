import React from "react";

export default function HeaderContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="col-start-1 col-end-3 row-start-1 z-10 px-6 my-3">
            {children}
        </div>
    )
}