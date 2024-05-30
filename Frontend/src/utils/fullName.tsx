import { IUserDetails } from "@/types";

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 * @param {string} str - The input string.
 * @returns {string} The string with the first letter capitalized and the rest lowercased.
 */
function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generates the full name with the first letter of each part capitalized.
 * @param {Partial<IUserDetails>} userDetails - The user details object.
 * @returns {string} The full name with the first letter of each part capitalized.
 */
export default function fullName(userDetails: Partial<IUserDetails>): string {
    const { firstName, middleName, lastName } = userDetails;
    let fullName = "";

    if (firstName) {
        const trimmedFirstName = firstName.trim();
        if (trimmedFirstName.length > 0) {
            fullName += capitalizeFirstLetter(trimmedFirstName);
        }
    }

    if (middleName) {
        const trimmedMiddleName = middleName.trim();
        if (trimmedMiddleName.length > 0) {
            fullName += ` ${capitalizeFirstLetter(trimmedMiddleName)}`;
        }
    }

    if (lastName) {
        const trimmedLastName = lastName.trim();
        if (trimmedLastName.length > 0) {
            fullName += ` ${capitalizeFirstLetter(trimmedLastName)}`;
        }
    }

    return fullName.trim();
}
