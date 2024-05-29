import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@radix-ui/react-select";

const filterOptions = [
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
    { value: "workflowStage", label: "Workflow Stage" },
];

interface ISelectFilterProps {
    selectedFilter: string;
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}
export default function SelectFilter({
    selectedFilter,
    setSelectedFilter,
}: ISelectFilterProps) {
    return (
        <Select
            onValueChange={(value) => setSelectedFilter(value)}
            defaultValue={selectedFilter}
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
