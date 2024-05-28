import tagRepository from "./tag.repository";
import ITag from "./types";

const tagServices = {
    // Get all tags
    getAllTags(): Promise<ITag[]> {
        return tagRepository.getAllTags();
    },

    // Get a single tag by ID
    getTagById(id: string): Promise<ITag | null> {
        return tagRepository.getTagById(id);
    },

    // Create a new tag
    createTag(tagData: ITag): Promise<ITag> {
        return tagRepository.createTag(tagData);
    },

    // Update an existing tag by ID
    updateTag(id: string, tagData: Partial<ITag>): Promise<ITag | null> {
        return tagRepository.updateTag(id, tagData);
    },

    // Delete a tag by ID
    deleteTag(id: string): Promise<ITag | null> {
        return tagRepository.deleteTag(id);
    },

    addTasksToTag(tagId: string, taskIds: string[]): Promise<ITag | null> {
        return tagRepository.addTasksToTag(tagId, taskIds);
    },

    removeTasksFromTag(tagId: string, taskIds: string[]): Promise<ITag | null> {
        return tagRepository.removeTasksFromTag(tagId, taskIds);
    },
};

export default tagServices;
