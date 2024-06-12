import DataTable from "@/components/TaskTable";
import { ITaskWithDetails } from "@/types";

export default function ListView({ data }: { data: ITaskWithDetails[] }) {
    return (
        <div className=" h-full flex justify-center px-5 md:px-10 overflow-x-auto">
            <DataTable data={data} />
        </div>
    );
}
