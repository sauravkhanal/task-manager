import userAPI from "@/api/userAPI";
import UserCard from "@/components/CreateTask/SelectUser/UserCard";
import LoadingIcon from "@/components/LoadingIcon";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IUserDetails } from "@/types";
import { useState } from "react";

// Create a cache object to store user details
const userDetailsCache: { [username: string]: IUserDetails } = {};

export default function FormatUsername({ username }: { username: string }) {
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchUserDetails = async () => {
        setLoading(true);
        // Check if user details are already in the cache
        if (userDetailsCache[username]) {
            setUserDetails(userDetailsCache[username]);
            setLoading(false);
            return;
        }

        // Fetch user details from the API
        const response = await userAPI.getUserByUsername(username);
        if (response.success) {
            const userData = response.data as IUserDetails;
            setUserDetails(userData);
            // Update the cache with the fetched user details
            userDetailsCache[username] = userData;
        } else {
            setUserDetails(null);
        }
        setLoading(false);
    };

    return (
        <HoverCard>
            <HoverCardTrigger
                className="capitalize font-semibold cursor-pointer"
                onMouseEnter={fetchUserDetails}
            >
                @{username}&nbsp;
            </HoverCardTrigger>
            <HoverCardContent className="flex justify-center">
                {loading ? (
                    <LoadingIcon isLoading={true} />
                ) : userDetails ? (
                    <UserCard
                        firstName={userDetails.firstName}
                        lastName={userDetails.lastName}
                        profileUrl={userDetails.profilePicture}
                        onRemove={undefined}
                    />
                ) : (
                    <p>Error loading user details</p>
                )}
            </HoverCardContent>
        </HoverCard>
    );
}
