/** Standard contract expected from paginated backend endpoints. */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/** Reusable query parameters accepted by paginated list endpoints. */
export interface PaginationParams {
  page: number;
  pageSize: number;
}
