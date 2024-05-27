import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { useContext } from "react";

export default function Dashboard() {
    const { userDetails, isLoggedIn } = useContext(AuthContext);
    console.log(isLoggedIn);

    const { showModal } = useModal();

    function content(): React.ReactNode {
        return (
            <div className="border border-red-500 bg-background">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam cumque excepturi perspiciatis id corrupti hic
                    assumenda ut, quisquam tempore iusto? Cumque vel velit ex
                    ullam illum architecto, porro incidunt facere?
                </p>
            </div>
        );
    }

    return (
        <div className=" flex flex-col items-center gap-2 justify-center">
            {isLoggedIn ? (
                <div>is logged in true</div>
            ) : (
                <div>not logged in</div>
            )}
            <div>
                {Object.entries(userDetails || {}).map((value) => (
                    <p>{value.toString().replace(",", ": ")}</p>
                ))}
            </div>
            <Button onClick={() => showModal(content())}>modal toggle</Button>
        </div>
    );
}
