import Loader from "react-spinners/PulseLoader";

export default function LoadingIcon({
    text,
    isLoading,
    className,
    color,
    size = 8,
    children,
    ...restProps
}: {
    text?: string;
    isLoading: boolean;
    className?: string;
    color?: string;
    size?: number;
    children?: React.ReactNode;
    [key: string]: any;
}) {
    // const color1 = color ? color : theme == "dark" ? "#ffffff" : "#000000";
    const opacity = isLoading ? "opacity-0" : "";
    return (
        <div
            className={`flex justify-center items-center ${className}`}
            {...restProps}
        >
            <Loader
                loading={isLoading}
                className="absolute"
                color={"#c0c0c0"}
                size={size}
            />

            <div className={`flex gap-1 ${opacity} w-full`}>
                <p>{text}</p>
                {children}
            </div>
        </div>
    );
}
