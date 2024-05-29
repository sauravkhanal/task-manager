import * as React from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

const filterOptions = [
    { value: "title", label: "Title" },
    { value: "priority", label: "Priority" },
    { value: "workflowStage", label: "Workflow Stage" },
];

function FilterInput({ table }: { table: Table<any> }) {
    const [selectedFilter, setSelectedFilter] = React.useState<string>("title");

    return (
        <div className="flex items-center space-x-2">
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

            <Input
                placeholder={`Filter ${selectedFilter}...`}
                value={
                    (table
                        .getColumn(selectedFilter)
                        ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    table
                        .getColumn(selectedFilter)
                        ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
        </div>
    );
}

export default FilterInput;
