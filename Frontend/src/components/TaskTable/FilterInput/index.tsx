import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import SelectFilter from "./SelectFilter";
import { useState } from "react";

export interface filterOption {
    value: string;
    label: string;
}

function FilterInput({ table }: { table: Table<any> }) {
    const [selectedFilter, setSelectedFilter] = useState<filterOption>({
        value: "title",
        label: "title",
    });

    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center  md:grow ml-1">
            <SelectFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                clearAllFilters={() => table.setColumnFilters([])}
            />

            <Input
                placeholder={`Search by ${selectedFilter.label}...`}
                value={
                    (table
                        .getColumn(selectedFilter.value)
                        ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) => {
                    table
                        .getColumn(selectedFilter.value)
                        ?.setFilterValue(event.target.value);
                }}
                className="max-w-64"
            />
        </div>
    );
}

export default FilterInput;
