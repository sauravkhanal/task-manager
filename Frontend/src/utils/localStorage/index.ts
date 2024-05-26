import { ILoginResponse, IUserDetails } from "@/types";

const local = {
    save({ accessToken, refreshToken, userDetails }: ILoginResponse) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    },

    get(key: keyof ILoginResponse): string | IUserDetails | null {
        if (key === "userDetails")
            return JSON.parse(localStorage.getItem("userDetails") || "{}");
        else return localStorage.getItem(key);
    },

    clear() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userDetails");
    },
};

export default local;
