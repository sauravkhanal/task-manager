import Loader from "react-spinners/PulseLoader";
import { useTheme } from "next-themes";

export default function LoadingIcon({
    text,
    isLoading,
    className,
    color,
    size = 8,
    ...restProps
}: {
    text: string;
    isLoading: boolean;
    className?: string;
    color?: string;
    size?: number;
    [key: string]: any;
}) {
    const { theme } = useTheme();
    const color1 = color ? color : theme == "dark" ? "#ffffff" : "#000000";
    // console.log(color1);
    return (
        <div
            className={`flex justify-center items-center ${className}`}
            {...restProps}
        >
            <Loader
                loading={isLoading}
                className="absolute"
                color={color1}
                size={size}
            />
            <span>
                {isLoading ? (
                    <p className="opacity-0">{text}</p>
                ) : (
                    <p>{text}</p>
                )}
            </span>
        </div>
    );
}
