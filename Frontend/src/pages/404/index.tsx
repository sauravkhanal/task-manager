export default function NotFound() {
    return (
        <div className="flex flex-col grow gap-10 justify-center items-center text-foreground">
            <p className="text-5xl font-bold">Error 404!</p>
            <p className="text-2xl font-semibold">
                The resource you're looking for couldn't be found.
            </p>
        </div>
    );
}
