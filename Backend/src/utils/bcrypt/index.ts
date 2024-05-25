import bcrypt from "bcryptjs";

export default function comparePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return bcrypt.compare(oldPassword, newPassword);
}
