import bcrypt from "bcryptjs";

export default function comparePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    return bcrypt.compare(oldPassword, newPassword);
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
