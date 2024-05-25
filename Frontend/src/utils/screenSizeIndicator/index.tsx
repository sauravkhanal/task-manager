export default function ScreenSizeIndicator() {
    return (
        <div className="sticky top-2 left-48 bg-secondary-foreground px-1 rounded-sm text-primary-foreground opacity-50 font-bold text-2xl">
            <p className="block sm:hidden">sm-</p>
            <p className="hidden sm:block md:hidden">sm+</p>
            <p className="hidden md:block lg:hidden">md+</p>
            <p className="hidden lg:block xl:hidden">lg+</p>
            <p className="hidden xl:block 2xl:hidden">xl+</p>
            <p className="hidden 2xl:block ">2xl+</p>
        </div>
    );
}
