import mongoose from "mongoose";
import CustomError from "../../../utils/CustomError";
import { messages } from "../../../utils/Messages";
import preferenceRepository from "../preferences/preferences.repository";
import { IUser } from "./types";
import userRepository from "./user.repository";

const userServices = {
    async createUser(userData: IUser) {
        let newPreferencesID;
        try {
            newPreferencesID = await preferenceRepository.createPreferences();
            const response = await userRepository.createNewUser({
                ...userData,
                preferencesID: newPreferencesID as unknown as mongoose.Types.ObjectId,
            });
            return response;
        } catch (error) {
            if (newPreferencesID) {
                await preferenceRepository.deletePreferences(newPreferencesID);
            }
            throw error;
        }
    },

    getAllUsers() {
        return userRepository.getAllUsers();
    },

    async getUserById(userId: string) {
        const user = await userRepository.findUserById(userId);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    async getUserByUsername(username: string) {
        const user = await userRepository.findUserByUsername(username);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    // async getUserByEmail(email: string) {
    //     const user = await userRepository.findUserByEmail(email)
    //     if (!user) throw new CustomError(404,messages.error[404])
    //     return user
    // },

    async updateUser(client_id: string, newData?: IUser) {
        const user = await userRepository.updateUserData(client_id, newData);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    async deleteUser(_id: string) {
        const user = await userRepository.deleteUser(_id);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    async recoverUser(_id: string) {
        const user = await userRepository.recoverUser(_id);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    async deactivateUser(_id: string) {
        const user = await userRepository.deactivateUser(_id);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    async reactivateUser(_id: string) {
        const user = await userRepository.reactivateUser(_id);
        if (!user) throw new CustomError(404, messages.user[404]);
        return user;
    },

    async verifyUser(_id: string, email: string) {
        const user = await userRepository.verifyUser(_id, email);
        if (!user) throw new CustomError(404, messages.user[404]);
    },

    getUserEmailsByIDs(IDs: string[]) {
        return userRepository.getUserEmailsByIDs(IDs);
    },
};

export default userServices;
