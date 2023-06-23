import { FilterType, type FilterFunc, type FilterFunctionMapping, type Filters, type Product } from "./types"

export function createStringArrayFilterFunc<T>(key: keyof T): FilterFunc<T> {
    return (product: T, filterValue: string) => {
        const value = product[key]

        if (!(value instanceof Array)) {
            throw new Error('Cannot filter a non array value')
        }

        return value.some((value) => value === filterValue)
    }
}

export function createStringFilterFunc<T>(key: keyof T): FilterFunc<T> {
    return (product: T, filterValue: string) => {
        return product[key] === filterValue
    }
}

export function createBooleanFilterFunc<T>(key: keyof T): FilterFunc<T> {
    return (product: T, filterValue: string) => {
        const booleanValue = filterValue === 'true' ? true : false
        return product[key] === booleanValue
    }
}

export function createFilterApplier<T>(filterFunctionMapping: FilterFunctionMapping<T>) {
    return (values: T[], filters: Filters): T[] => {
        return values.filter((values) => {
            return Object.entries(filters).every(([filterType, filterValues]) => {

                // If no filters are applied for the specific type we need to handle the case seperataly
                if(filterValues.length === 0) {
                    return true
                }

                const filterFunc = filterFunctionMapping[filterType as any as FilterType] // TODO: Fix typings
                return (filterValues || []).some((filterValue) => filterFunc(values, filterValue))//filterFuncitonMapping
            })
        })
    }
}

export const filterFunctionMapping: FilterFunctionMapping<Product> = {
    [FilterType.MANUFACTURER]: createStringFilterFunc('manufacturer'),
    [FilterType.COLORS]: createStringArrayFilterFunc('colors'),
    [FilterType.HAS_FIGE_G]: createBooleanFilterFunc('has_5g'),
    [FilterType.HAS_E_SIM]: createBooleanFilterFunc('has_esim'),
    [FilterType.OPERATING_SYSTEM]: createStringFilterFunc('operating_system'),
    [FilterType.REFURBISHED]: createBooleanFilterFunc('refurbished'),
  }

export const applyFilters = createFilterApplier(filterFunctionMapping)
