import mongoose from "mongoose";
import PreferenceModel from "./preferences.model";
import { IPreferences } from "./types";

const preferenceRepository = {
    async createPreferences() {
        const newPreferences = new PreferenceModel({});
        const savedPreferences = await newPreferences.save();
        return savedPreferences._id;
    },
    getPreferences(_id: string) {
        return PreferenceModel.findOne({ _id });
    },
    setPreferences({ _id, preferenceData }: { _id: string; preferenceData: IPreferences }) {
        return PreferenceModel.findByIdAndUpdate({ _id }, { ...preferenceData });
    },
    deletePreferences(_id: string) {
        return PreferenceModel.findByIdAndDelete({ _id });
    },
};

export default preferenceRepository;
