import preferenceRepository from "./preferences.repository";
import { IPreferences } from "./types";

const preferenceServices = {
    getPreferences: (_id: string) => {
        return preferenceRepository.getPreferences(_id);
    },
    setPreferences: (data: { _id: string; preferenceData: IPreferences }) => {
        return preferenceRepository.setPreferences(data);
    },
    deletePreferences: (_id: string) => {
        return preferenceRepository.deletePreferences(_id);
    },
};

export default preferenceServices;
