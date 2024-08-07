import { CheckCircle, Circle } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { ITag, ITaskWithDetails } from "@/types";
import {
    UseFormGetValues,
    UseFormSetValue,
    useFormContext,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TagCreator } from "../TagCreator";
import { Badge } from "@/components/ui/badge";

interface ComboBoxProps {
    availableTags: ITag[];
    prevTags?: ITag[];
    getValues: UseFormGetValues<ITaskWithDetails>;
    setValue: UseFormSetValue<ITaskWithDetails>;
}

export default function TagsSelector({ availableTags }: ComboBoxProps) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setSelectedTags(fromMethods.getValues("tags"));
    }, []);
    const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

    const fromMethods = useFormContext<ITaskWithDetails>();

    const toggleStatus = (tag: ITag) => {
        setSelectedTags((prevSelected) => {
            if (prevSelected?.some((t) => t._id === tag._id)) {
                return prevSelected.filter((t) => t._id !== tag._id);
            } else {
                return [...(prevSelected || []), tag];
            }
        });
    };

    useEffect(() => {
        fromMethods.setValue(
            "tagIDs",
            selectedTags?.map((tag) => tag._id) || [],
        );
    }, [selectedTags]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start overflow-hidden"
                >
                    {selectedTags && selectedTags?.length > 0 ? (
                        <>
                            {selectedTags?.slice(0, 2).map((tag, index) => (
                                <span
                                    key={tag._id}
                                    className={`mr-2 px-2 py-1 rounded ${
                                        index === 1 ? "hidden-xs" : ""
                                    }`}
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.title}
                                </span>
                            ))}
                            {selectedTags?.length > 2 && (
                                <Badge className="mr-2" variant={"outline"}>
                                    +{selectedTags.length - 2}
                                </Badge>
                            )}
                        </>
                    ) : (
                        <>+ Add Tags</>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Change tags..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            <CommandItem className="flex justify-center">
                                <TagCreator />
                            </CommandItem>
                            {availableTags.map((tag) => (
                                <CommandItem
                                    key={tag._id}
                                    value={tag._id}
                                    onSelect={(value) => {
                                        const selectedTag = availableTags.find(
                                            (t) => t._id === value,
                                        );
                                        if (selectedTag) {
                                            toggleStatus(selectedTag);
                                        }
                                    }}
                                >
                                    {selectedTags?.some(
                                        (t) => t._id === tag._id,
                                    ) ? (
                                        <CheckCircle className="mr-2 h-4 w-4 opacity-100" />
                                    ) : (
                                        <Circle className="mr-2 h-4 w-4 opacity-40" />
                                    )}
                                    <span>{tag.title}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
