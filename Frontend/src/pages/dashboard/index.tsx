import { AuthContext } from "@/context/authContext";
import local from "@/utils/localStorage";
import { useContext } from "react";

export default function Dashboard() {
    const { userDetails, isLoggedIn } = useContext(AuthContext);
    console.log(isLoggedIn);
    return (
        <>
            <p>The data if any</p>
            {isLoggedIn ? <div>is logged true</div> : <div>not logged in</div>}
            <div>is logged in : {!!local.get("accessToken")}</div>
            <div>{userDetails?.email}</div>
            <div>{Object.entries(userDetails || {})}</div>
        </>
    );
}
