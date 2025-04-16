import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (data: any[] | null) => {
    const location = useLocation();
    const navigate = useNavigate();
    const itemsPerPage = 10;

    // Get current page from URL, defaulting to 1 if not present
    const currentPage = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get("page") || "1", 10);
        return page > 0 ? page : 1;
    }, [location.search]);

    // Calculate total pages and paginated data
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
    const paginatedData = useMemo(
        () => data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [data, currentPage, itemsPerPage]
    );

    // Handle page change by updating URL
    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(location.search);
        params.set("page", page.toString());
        navigate({ search: params.toString() });
    };

    return {
        currentPage,
        totalPages,
        paginatedData,
        handlePageChange,
    };
};