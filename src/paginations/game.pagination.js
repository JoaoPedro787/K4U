export const gameAllPagination = (page, limit, orderBy, count) => {
  const hasNextPage = page * limit < count;
  const hasPreviousPage = page > 1;

  const previousPage = hasPreviousPage
    ? `?page=${page - 1}&limit=${limit}`
    : null;

  const nextPage = hasNextPage ? `?page=${page + 1}&limit=${limit}` : null;

  const pagination = {
    count,
    orderBy,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    hasNextPage,
    hasPreviousPage,
    previousPage,
    nextPage,
  };

  return pagination;
};
