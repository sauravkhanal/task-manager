import UserModel, { IUserDocument } from "../../../models/userModel";
import { IUser } from "./types";

const userRepository = {
    getAllUsers(): Promise<IUserDocument[] | null> {
        return UserModel.find().sort({ createdAt: -1 }).select({ password: false });
    },

    findUserByEmail(email: string): Promise<IUserDocument | null> {
        return UserModel.findOne({ email }).select({ password: false });
    },

    findUserById(_id: string): Promise<IUserDocument | null> {
        return UserModel.findById({ _id }).select({ password: false });
    },

    findUserByUsername(username: string): Promise<IUserDocument | null> {
        return UserModel.findOne({ username }).select({ password: false });
    },

    findUserByUsernameOrEmail(emailOrUsername: string): Promise<IUserDocument | null> {
        return UserModel.findOne({ $or: [{ username: emailOrUsername }, { email: emailOrUsername }] });
    },

    findUserByData(userData?: Partial<IUserDocument>): Promise<IUserDocument | null> {
        return UserModel.findOne(userData).select({ password: false });
    },

    createNewUser(userData: IUser): Promise<IUserDocument> {
        const newUser = new UserModel(userData);
        return newUser.save();
    },

    updateUserData(_id: string, newData?: IUser): Promise<IUserDocument | null> {
        return UserModel.findOneAndUpdate({ _id }, { ...newData }, { new: true }).select({ password: false });
    },

    deleteUser(_id: string): Promise<IUserDocument | null> {
        return UserModel.findOneAndUpdate({ _id }, { deleted: true, deactivated: true }, { new: true }).select({
            password: false,
        });
    },

    recoverUser(_id: string): Promise<IUserDocument | null> {
        return UserModel.findOneAndUpdate({ _id }, { deleted: false }, { new: true }).select({ password: false });
    },

    deactivateUser(_id: string): Promise<IUserDocument | null> {
        return UserModel.findOneAndUpdate({ _id }, { deactivated: true }, { new: true }).select({ password: false });
    },

    reactivateUser(_id: string): Promise<IUserDocument | null> {
        return UserModel.findOneAndUpdate({ _id }, { deactivated: false }, { new: true }).select({ password: false });
    },

    verifyUser(_id: string, email: string): Promise<IUserDocument | null> {
        return UserModel.findOneAndUpdate({ _id, email }, { emailVerified: true }, { new: true }).select({
            password: false,
        });
    },

    async getUserEmailsByIDs(IDs: string[]): Promise<string[]> {
        const users = await UserModel.find({ _id: { $in: IDs } });
        const emails = users.map((user) => user.email);
        return emails;
    },

    resetPassword(_id: string, newPassword: string): Promise<IUser | null> {
        return UserModel.findByIdAndUpdate({ _id }, { password: newPassword }).select({ password: false });
    },
};

export default userRepository;
