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
import { useState } from "react";
import { ITask, IUserDetails } from "@/types";
import UserCard from "./UserCard";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { UseFormSetValue } from "react-hook-form";

interface SelectUserProps {
    prevUsers: IUserDetails[];
    availableUsers: IUserDetails[];
    setValue: UseFormSetValue<ITask>;
}

export function SelectUser({
    prevUsers,
    availableUsers,
    setValue,
}: SelectUserProps) {
    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] =
        useState<IUserDetails[]>(prevUsers);

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
                        <AvatarFallback>+</AvatarFallback>
                    </Avatar>
                    {selectedUsers.map((value) => (
                        <UserCard
                            key={value._id}
                            firstName={value.firstName}
                            lastName={value.lastName}
                            profileUrl={value.profilePicture}
                            onRemove={() => toggleStatus(value)}
                        />
                    ))}
                    {selectedUsers.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Click to assign availableUsers to this task...
                        </p>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Search availableUsers..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            <ScrollArea className="h-44">
                                {availableUsers.map((user) => (
                                    <CommandItem
                                        key={user._id}
                                        value={
                                            user.firstName + " " + user.lastName
                                        }
                                        onSelect={(value) => {
                                            const selectedUser =
                                                availableUsers.find(
                                                    (user) =>
                                                        user.firstName +
                                                            " " +
                                                            user.lastName ===
                                                        value,
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
                                        <span>
                                            {user.firstName +
                                                " " +
                                                user.lastName}
                                        </span>
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}