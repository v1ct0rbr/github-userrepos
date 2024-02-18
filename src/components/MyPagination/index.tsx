import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface PaginationProps {
   
    currentPage: number,
    isLastPage: boolean,
    handlePreviousPage: () => void,
    handleNextPage: () => void
}


export function MyPagination({ currentPage, isLastPage, handleNextPage, handlePreviousPage }: PaginationProps) {
    return (
        <div className='col-span-4 md:col-span-5 lg:col-span-2 xl:col-span-1 flex items-center justify-end p-2'>
            <span className="text-nowrap">Página Atual: {currentPage}</span>
            <Pagination className="mx-0 w-fit">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" className={currentPage !== 1 ? 'visible' : 'invisible'} aria-disabled={currentPage !== 1} onClick={handlePreviousPage} />
                    </PaginationItem>

                    <PaginationItem >
                        <PaginationNext href="#" className={isLastPage ? 'invisible' : 'visible'} onClick={handleNextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>

    )
}