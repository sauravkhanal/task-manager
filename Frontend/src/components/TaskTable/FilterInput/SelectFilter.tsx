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
import { ITaskWithDetails } from "@/types";

const filterOptions: { value: keyof ITaskWithDetails; label: string }[] = [
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
    { value: "workflowStage", label: "Workflow Stage" },
    { value: "tags", label: "Tags" },
    { value: "creator", label: "Creator" },
    { value: "assignees", label: "Assignees" },
    { value: "dueDate", label: "Due Date" },
];

interface ISelectFilterProps {
    selectedFilter: filterOption;
    setSelectedFilter: React.Dispatch<React.SetStateAction<filterOption>>;
    clearAllFilters: () => void;
}
export default function SelectFilter({
    selectedFilter,
    setSelectedFilter,
    clearAllFilters,
}: ISelectFilterProps) {
    return (
        <Select
            onValueChange={(value) => {
                const selectedOption = filterOptions.find(
                    (option) => option.value === value,
                );
                if (selectedOption) {
                    clearAllFilters();
                    setSelectedFilter(selectedOption);
                }
            }}
            defaultValue={selectedFilter.value}
        >
            <SelectTrigger className="max-w-36">
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
