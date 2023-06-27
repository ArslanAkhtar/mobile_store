import type { Product, SortFunctionMapping } from "./types";

export function orderBySortOrder(products: Product[]): Product[] {
  return products.sort((a, b) => b.sort_order - a.sort_order);
}

export function orderByReleaseDate(products: Product[]): Product[] {
  return products.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function orderByPromotion(products: Product[]): Product[] {
  return products.filter((item) => item.has_promotion);
}

export const sortFunctionMapping: SortFunctionMapping = {
  orderBySortOrder,
  orderByReleaseDate,
  orderByPromotion,
};
