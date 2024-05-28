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

    /**
     * clears accessToken, refreshToken and userDetails if name not provided(default). else clears the item with given key from local storage
     * @param name - string: name of the item to clear.
     */
    clear(name?: string) {
        if (name) {
            localStorage.removeItem(name);
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userDetails");
        }
    },

    /**
     * saves Object into local by stringify-ing
     */
    saveJSON(key: string, value: any) {
        return localStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * recovers Object from local by parsing
     */
    getJSON(key: string) {
        return JSON.parse(localStorage.getItem(key) || "{}");
    },
};

export default local;
