import { FilterType, type FilterFunc, type FilterFunctionMapping, type Filters, type Product } from "./types"

export function createStringArrayFilterFunc(key: keyof Product): FilterFunc {
    return (product: Product, filterValue: string) => {
        const value = product[key]

        if (!(value instanceof Array)) {
            throw new Error('Cannot filter a non array value')
        }

        return value.some((value) => value === filterValue)
    }
}

export function createStringFilterFunc(key: keyof Product): FilterFunc {
    return (product: Product, filterValue: string) => {
        return product[key] === filterValue
    }
}

export function createBooleanFilterFunc(key: keyof Product): FilterFunc {
    return (product: Product, filterValue: string) => {
        const booleanValue = filterValue === 'true' ? true : false
        return product[key] === booleanValue
    }
}

export const filterFunctionMapping: FilterFunctionMapping = {
    [FilterType.MANUFACTURER]: createStringFilterFunc('manufacturer'),
    [FilterType.COLORS]: createStringArrayFilterFunc('colors'),
    [FilterType.HAS_FIGE_G]: createBooleanFilterFunc('has_5g'),
    [FilterType.HAS_E_SIM]: createBooleanFilterFunc('has_esim'),
    [FilterType.OPERATING_SYSTEM]: createStringFilterFunc('operating_system'),
    [FilterType.REFURBISHED]: createBooleanFilterFunc('refurbished'),
  }

export function applyFilters(products: Product[], filters: Filters): Product[] {
    return products.filter((product) => {
        // Every filter needs to have at least one hit.
        return Object.entries(filters).every(([filterType, filterValues]) => {
            const filterFunc = filterFunctionMapping[filterType as any as FilterType] // TODO: Fix typings
            return (filterValues || []).some((filterValue) => filterFunc(product, filterValue))//filterFuncitonMapping
        })
    })
}