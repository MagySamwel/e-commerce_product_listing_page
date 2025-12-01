import Link from "next/link";
import { ReactNode } from "react";
import { Pagination } from "@/lib/api/products";

interface PaginationControlsProps {
  pagination: Pagination;
  searchParams: Record<string, string | string[] | undefined>;
}

const getPageNumbers = (current: number, total: number): number[] => {
  const visiblePages = 5;
  const half = Math.floor(visiblePages / 2);

  let start = Math.max(current - half, 1);
  let end = start + visiblePages - 1;

  if (end > total) {
    end = total;
    start = Math.max(end - visiblePages + 1, 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return pages;
};

const buildHref = (
  searchParams: Record<string, string | string[] | undefined>,
  page: number
) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined || key === "page") return;

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else {
      params.set(key, value);
    }
  });

  params.set("page", String(page));

  return `/products?${params.toString()}`;
};

function PaginationControls({
  pagination,
  searchParams,
}: PaginationControlsProps) {
  const { total_pages: totalPages, current_page: currentPage } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      className="flex flex-col items-center justify-center gap-4 border-t border-gray-200 pt-6 mt-6"
      aria-label="Pagination"
    >
      <div className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <PaginationLink
          href={buildHref(searchParams, currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </PaginationLink>
        {pages[0] > 1 && (
          <>
            <PaginationLink href={buildHref(searchParams, 1)}>
              1
            </PaginationLink>
            {pages[0] > 2 && <span className="px-2 text-gray-400">…</span>}
          </>
        )}
        {pages.map((page) => (
          <PaginationLink
            key={page}
            href={buildHref(searchParams, page)}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-400">…</span>
            )}
            <PaginationLink href={buildHref(searchParams, totalPages)}>
              {totalPages}
            </PaginationLink>
          </>
        )}
        <PaginationLink
          href={buildHref(searchParams, currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationLink>
      </div>
    </nav>
  );
}

interface PaginationLinkProps {
  href: string;
  disabled?: boolean;
  isActive?: boolean;
  children: ReactNode;
}

function PaginationLink({
  href,
  disabled,
  isActive,
  children,
}: PaginationLinkProps) {
  if (disabled) {
    return (
      <span className="px-4 py-2 text-sm text-gray-400 border border-gray-200 rounded-lg cursor-not-allowed">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
        isActive
          ? "bg-gray-900 text-white border-gray-900"
          : "text-gray-700 border-gray-200 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}

export default PaginationControls;

