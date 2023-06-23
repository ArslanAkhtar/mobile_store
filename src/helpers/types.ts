
export const FilterType = {
  MANUFACTURER: 'MANUFACTURER',
  COLORS: 'COLORS',
  HAS_FIGE_G: 'HAS_FIGE_G',
  HAS_E_SIM:  'HAS_E_SIM',
  OPERATING_SYSTEM: 'OPERATING_SYSTEM',
  REFURBISHED: 'REFURBISHED',
} as const

export type FilterType = keyof typeof FilterType

export type Filters = {
  [key in FilterType]?: string[]
}

export type FilterFunc<T> = (value: T, filterValue: string) => boolean
export type FilterFunctionMapping<T> = {
  [key in FilterType]: FilterFunc<T>
}

export interface Product {
  id: number
  name: string
  model: string
  manufacturer: string
  colors: string[]
  has_5g: boolean
  has_esim: boolean
  operating_system: string
  refurbished: boolean
  sort_order: number
  release_date: string 
  has_promotion: boolean
}