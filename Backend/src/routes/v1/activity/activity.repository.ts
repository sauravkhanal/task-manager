import activityModel, { IActivity, IActivityDocument } from "./activity.model";

const activityRepository = {
    createActivity: async (activityDetails: IActivity): Promise<IActivityDocument | null> => {
        const newActivity = new activityModel(activityDetails);
        const savedActivity = await newActivity.save();
        return savedActivity ? (savedActivity.toObject() as IActivityDocument) : null;
    },

    getActivityDetails: (activityIDs: string[]) => {
        return activityModel.find({ _id: { $in: activityIDs } });
    },
};

export default activityRepository;
