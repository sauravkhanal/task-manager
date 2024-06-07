import { CheckCircle, Circle, Plus, SquarePlus } from "lucide-react";
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
import { ITaskWithDetails, IUserDetails } from "@/types";
import UserCard from "./UserCard";
import { UseFormSetValue } from "react-hook-form";
import useDataContext from "@/context/dataContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import fullName from "@/utils/fullName";

interface SelectUserProps {
    prevUsers: IUserDetails[];
    setValue: UseFormSetValue<ITaskWithDetails>;
}

export function SelectUser({ prevUsers, setValue }: SelectUserProps) {
    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] =
        useState<IUserDetails[]>(prevUsers);
    const context = useDataContext();
    const availableUsers = context.allUserDetails;

    useEffect(() => {
        setValue(
            "assigneeIDs",
            prevUsers.map((user) => user._id),
        );
    }, [prevUsers, setValue]);

    const toggleStatus = (user: IUserDetails) => {
        const updatedSelectedUsers = selectedUsers.some(
            (selectedUser) => selectedUser._id === user._id,
        )
            ? selectedUsers.filter(
                  (selectedUser) => selectedUser._id !== user._id,
              )
            : [...selectedUsers, user];

        setSelectedUsers(updatedSelectedUsers);
        setValue(
            "assigneeIDs",
            updatedSelectedUsers.map((user) => user._id),
        );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="border border-border rounded-md bg-background flex flex-wrap gap-2 min-h-20 shadow-sm p-4 max-h-44 overflow-y-auto cursor-pointer items-center">
                    <Avatar>
                        <AvatarFallback>
                            <Plus />
                        </AvatarFallback>
                    </Avatar>
                    {selectedUsers.map((value) => (
                        <UserCard
                            key={value._id}
                            firstName={value.firstName}
                            middleName={value.middleName}
                            lastName={value.lastName}
                            profileUrl={value.profilePicture}
                            onRemove={() => toggleStatus(value)}
                        />
                    ))}
                    {selectedUsers.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Click to assign users to this task...
                        </p>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Search users..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            <ScrollArea className="h-44">
                                {availableUsers.map((user) => {
                                    return (
                                        <CommandItem
                                            key={user._id}
                                            value={user._id}
                                            onSelect={(value) => {
                                                const selectedUser =
                                                    availableUsers.find(
                                                        (user) =>
                                                            user._id === value,
                                                    );
                                                if (selectedUser) {
                                                    toggleStatus(selectedUser);
                                                }
                                            }}
                                        >
                                            {selectedUsers.some(
                                                (t) => t._id === user._id,
                                            ) ? (
                                                <CheckCircle className="mr-2 h-4 w-4 opacity-100" />
                                            ) : (
                                                <Circle className="mr-2 h-4 w-4 opacity-40" />
                                            )}
                                            {fullName(user)}
                                        </CommandItem>
                                    );
                                })}
                            </ScrollArea>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
