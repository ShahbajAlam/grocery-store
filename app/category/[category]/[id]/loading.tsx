export default function Loading() {
    return (
        <div className="fixed inset-0 z-[5] flex justify-center items-center">
            <span className="loading loading-spinner text-info w-16 h-16"></span>
        </div>
    );
}
