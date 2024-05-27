import { CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { ITag } from "@/types";
import { TagCreator } from "../TagCreator";

export function ComboBox({ tags }: { tags: ITag[] }) {
    const [open, setOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState<ITag[]>([]);

    const toggleStatus = (tag: ITag) => {
        setSelectedTags((prevSelected) => {
            if (prevSelected.some((t) => t._id === tag._id)) {
                return prevSelected.filter((t) => t._id !== tag._id);
            } else {
                return [...prevSelected, tag];
            }
        });
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start overflow-hidden"
                >
                    {selectedTags.length > 0 ? (
                        selectedTags.map((tag) => (
                            <span
                                key={tag._id}
                                className="mr-2 px-2 py-1 rounded"
                                style={{ backgroundColor: tag.color }}
                            >
                                {tag.title}
                            </span>
                        ))
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
                                {/* <Button variant={"outline"} onClick={() => {}}>
                                    Create new tag
                                </Button> */}
                                <TagCreator />
                            </CommandItem>
                            {tags.map((tag) => (
                                <CommandItem
                                    key={tag._id}
                                    value={tag._id}
                                    onSelect={(value) => {
                                        const selectedTag = tags.find(
                                            (t) => t._id === value,
                                        );
                                        if (selectedTag) {
                                            toggleStatus(selectedTag);
                                        }
                                    }}
                                >
                                    {selectedTags.some(
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
