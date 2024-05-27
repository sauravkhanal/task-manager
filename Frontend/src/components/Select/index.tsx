import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SelectItems({
    placeholder,
    label,
    items,
}: {
    placeholder: string;
    label: string;
    items: {
        title: string;
        color: string;
    }[];
}) {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue
                    placeholder={placeholder}
                    className="font-semibold"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem value={item.title} key={item.title}>
                            <p
                                className="font-semibold mr-2 px-2 py-1 rounded"
                                style={{ background: item.color }}
                            >
                                {item.title}
                            </p>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
