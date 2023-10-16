export function pagination(range: number, page: number) {
  const itemPerPage = range;
  let from = page * itemPerPage;
  const to = from + itemPerPage;
  if (page > 0) from += 1;
  return { from, to };
}
