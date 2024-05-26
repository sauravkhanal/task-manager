import { createContext, useState } from "react";
import { ILoginResponse, IUserDetails } from "@/types";
import local from "@/utils/localStorage";

type TAuthContext = {
    userDetails: IUserDetails | null;
    isLoggedIn: boolean;
    getUserDetails: () => IUserDetails | null;
    login: (userLoginData: ILoginResponse) => void;
    logout: () => void;
};

export const AuthContext = createContext<TAuthContext>({
    userDetails: null,
    isLoggedIn: false,
    getUserDetails: () => null,
    login: () => null,
    logout: () => {},
});

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(
        local.get("userDetails") as IUserDetails,
    );

    const login = (userLoginData: ILoginResponse) => {
        local.save(userLoginData);
        setUserDetails(local.get("userDetails") as IUserDetails);
    };

    const logout = () => {
        local.clear();
        setUserDetails(null);
    };

    const getUserDetails = () => {
        return userDetails;
    };

    return (
        <AuthContext.Provider
            value={{
                userDetails,
                isLoggedIn: !!local.get("accessToken"),
                getUserDetails,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
