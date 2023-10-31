import React, { useState} from "react";

function Index() {
    const [name, setName] = useState("hello");
    return (
        <div className={"max-w-2xl mx-auto"}></div>
    );
}
export {Index};