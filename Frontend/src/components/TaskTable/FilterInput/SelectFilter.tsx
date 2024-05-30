import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { filterOption } from ".";
import { ITask } from "@/types";

const filterOptions: { value: keyof ITask; label: string }[] = [
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
    { value: "workflowStage", label: "Workflow Stage" },
    { value: "tagIDs", label: "Tags" },
    { value: "creatorID", label: "Creator" },
    { value: "assigneeIDs", label: "Assignees" },
    { value: "dueDate", label: "Due Date" },
];

interface ISelectFilterProps {
    selectedFilter: filterOption;
    setSelectedFilter: React.Dispatch<React.SetStateAction<filterOption>>;
}
export default function SelectFilter({
    selectedFilter,
    setSelectedFilter,
}: ISelectFilterProps) {
    return (
        <Select
            onValueChange={(value) => {
                const selectedOption = filterOptions.find(
                    (option) => option.value === value,
                );
                if (selectedOption) {
                    setSelectedFilter(selectedOption);
                }
            }}
            defaultValue={selectedFilter.value}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filter By</SelectLabel>
                    {filterOptions.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
