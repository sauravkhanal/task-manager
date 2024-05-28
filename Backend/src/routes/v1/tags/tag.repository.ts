import TagModel from "./tag.models";
import ITag from "./types";

const tagRepository = {
    // Get all tags
    getAllTags(): Promise<ITag[]> {
        return TagModel.find().exec();
    },

    // Get a single tag by ID
    getTagById(id: string): Promise<ITag | null> {
        return TagModel.findById(id).exec();
    },

    // Create a new tag
    createTag(tagData: ITag): Promise<ITag> {
        const newTag = new TagModel(tagData);
        return newTag.save();
    },

    // Update an existing tag by ID
    updateTag(id: string, tagData: Partial<ITag>): Promise<ITag | null> {
        return TagModel.findByIdAndUpdate(id, tagData, { new: true });
    },

    // Delete a tag by ID
    deleteTag(id: string): Promise<ITag | null> {
        return TagModel.findByIdAndUpdate(id, { deleted: true });
    },

    addTasksToTag(tagId: string, taskIds: string[]): Promise<ITag | null> {
        return TagModel.findByIdAndUpdate(tagId, { $push: { taskIDs: taskIds } }, { new: true });
    },

    removeTasksFromTag(tagId: string, taskIds: string[]): Promise<ITag | null> {
        return TagModel.findByIdAndUpdate(tagId, { $pull: { taskIDs: taskIds } }, { new: true });
    },
};

export default tagRepository;
