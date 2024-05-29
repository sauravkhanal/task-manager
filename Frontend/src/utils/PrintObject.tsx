export default function printObject(data: any) {
    console.log(data[0]);
    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
    }
}
