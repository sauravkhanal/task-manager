import { Table } from "@tanstack/react-table";

/**
 * This function retrieves the values of a specified field from all selected rows in a table.
 *
 * @template T - The type of the table rows.
 * @param {Object} params - The parameters for the function.
 * @param {Table<T>} params.table - The table object containing the selected row model.
 * @param {keyof T} params.key - The key of the field to retrieve from each selected row.
 * @returns {string[]} - An array of values for the specified field from the selected rows.
 */
export default function recoverSelectedFieldsFromTable<T>({
    table,
    key,
}: {
    table: Table<T>;
    key: keyof T;
}): string[] {
    // Initialize an array to hold the selected values
    let selected: string[] = [];

    // Iterate over each selected row and extract the value of the specified field
    table.getSelectedRowModel().flatRows.forEach((row) => {
        // Ensure the value is a string before pushing it to the array
        const value = row.original[key];
        if (typeof value === "string") {
            selected.push(value);
        } else {
            console.warn(`Value of key "${String(key)}" is not a string.`);
        }
    });

    // Return the array of selected values
    return selected;
}
