'use client'

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null)


export default function GlobalState({ children }) {
    const [userID, setUserID] = useState(null)

    useEffect(() => {
        if (Cookies.get("userID") !== undefined) {
            const storedUserID = Cookies.get("userID");
            setUserID(storedUserID);
        } else {
            setUserID(null)
        }
    }, [Cookies.get("userID")]);

    const updateUserID = (id) => {
        setUserID(id);
        Cookies.set("userID", id, { expires: 7 });
    };

    return (
        <GlobalContext.Provider value={{ userID, setUserID: updateUserID }}>{children}</GlobalContext.Provider>
    )
}