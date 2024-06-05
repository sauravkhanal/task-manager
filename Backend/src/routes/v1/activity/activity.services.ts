import { IActivity, IActivityDocument } from "./activity.model";
import activityRepository from "./activity.repository";

const activityServices = {
    createActivity: (activityDetails: IActivity): Promise<IActivityDocument | null> => {
        return activityRepository.createActivity(activityDetails);
    },

    getActivityDetails: (activityIDs: string[]): Promise<IActivity[]> => {
        return activityRepository.getActivityDetails(activityIDs);
    },
};

export default activityServices;
