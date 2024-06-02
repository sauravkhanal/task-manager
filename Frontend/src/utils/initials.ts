import { IUserDetails } from "@/types";

/**
 * Generates the initials of from the name of user.
 * @param {Partial<IUserDetails>} userDetails - The user details object.
 * @returns {string} The initials of the user.
 */
export default function initials(userDetails: Partial<IUserDetails>): string {
    const { firstName, lastName } = userDetails;
    let initials = "";

    if (firstName) {
        const trimmedFirstName = firstName.trim();
        if (trimmedFirstName.length > 0) {
            initials += trimmedFirstName.charAt(0);
        }
    }

    if (lastName) {
        const trimmedLastName = lastName.trim();
        if (trimmedLastName.length > 0) {
            initials += trimmedLastName.charAt(0);
        }
    }

    return initials.trim().toUpperCase();
}
