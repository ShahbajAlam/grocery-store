"use client";

type PaginationProps = {
    page: number;
    firstPage: number;
    lastPage: number;
    prevPageHandler: () => void;
    nextPageHandler: () => void;
};

function Pagination(props: PaginationProps) {
    const { firstPage, lastPage, page, prevPageHandler, nextPageHandler } =
        props;

    return (
        <div className="join w-full flex justify-center my-4">
            <button
                disabled={page === firstPage}
                className="join-item btn text-lg px-5"
                onClick={prevPageHandler}
            >
                «
            </button>
            <button className="join-item btn text-lg px-5">Page {page}</button>
            <button
                disabled={page === lastPage}
                className="join-item btn text-lg px-5"
                onClick={nextPageHandler}
            >
                »
            </button>
        </div>
    );
}

export default Pagination;
