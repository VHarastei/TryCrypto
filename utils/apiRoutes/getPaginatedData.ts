export const getPaginatedData = (data: any, page: number, limit: number) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, items };
};
