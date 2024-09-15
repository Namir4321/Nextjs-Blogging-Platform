import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { totalBlogAction } from "@/utils/action";
import { useEffect, useState } from "react";
const PaginationComp = ({ page, selectedTag }) => {
  const [totalBlog, setTotalBlogs] = useState(0);
  const currentPage = Number(page);
  const blogPerPage = 5;
  const totalPages = Math.ceil(totalBlog / blogPerPage);
  
  useEffect(() => {
    const fetchTotalPage = async () => {
      try {
        // console.log(selectedTag);
        const total = await totalBlogAction(selectedTag);
        setTotalBlogs(total);
      } catch (err) {
        return { message: err.messsage };
      }
    };
    fetchTotalPage();
  }, [selectedTag]);

  if (totalPages === 0) return null;
  console.log(`total ${totalPages}`);
  console.log(`current ${currentPage}`);

  return (
    <div className="hidden md:flex justify-center">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
                disabled={currentPage === 0}
              />
            </PaginationItem>
          )}
          {/* one previous page */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
                disabled={currentPage === 0}
              >
                {currentPage === 0 ? "" : currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* current page */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href={
                  currentPage === 1 || currentPage === 0
                    ? "/"
                    : `/?page=${currentPage}`
                }
                disabled={currentPage === 0}
              >
                {currentPage === 0 ? 1 : currentPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* next page than current page */}

          {currentPage < totalPages > 1 && (
            <PaginationItem>
              <PaginationLink
                href={
                  currentPage === 0
                    ? `/?page=${currentPage + 2}`
                    : `/?page=${currentPage + 1}`
                }
                disabled={currentPage === totalPages - 1 || totalPages === 1}
              >
                {currentPage === 0 ? currentPage + 2 : currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage === 0
                    ? `/?page=${currentPage + 2}`
                    : `/?page=${currentPage + 1}`
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComp;
