import React, { createContext, useContext, useState } from "react";
import { useLocalState } from "../Services/useLocalStorage";
const UserContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    //Cần displayName là user.fullname để rerender khi user thay đổi.
    // Vì nếu lấy trực tiếp từ user thì khó kiểm tra được khi nào user thay đổi
    const [displayName, setDisplayName] = useLocalState('displayName', '')
    const [jwt, setJwt] = useLocalState('jwt', '')
    const [user, setUser] = useLocalState('user', null)
    const value = { isLoading, setIsLoading, displayName, setDisplayName, jwt, setJwt, user, setUser };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useLoading() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}

export { useLoading, LoadingProvider };