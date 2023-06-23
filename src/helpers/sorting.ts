import type { Product } from "./types";

export function orderBySortOrder(products: Product[]): Product[] {
    return products.sort((a, b) => b.sort_order - a.sort_order)
}

export function orderByReleaseDate(products: Product[]): Product[] {
    // @TODO: Implement
    return products.sort((a, b) => a.sort_order - b.sort_order)
}

export function orderByPromotion(products: Product[]): Product[] {
    // @TODO: Implement
    return products.sort((a, b) => b.sort_order - a.sort_order)
}