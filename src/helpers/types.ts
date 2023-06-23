
export enum FilterType {
  MANUFACTURER= 'MANUFACTURER',
  COLORS= 'COLORS',
  HAS_FIGE_G= 'HAS_FIGE_G',
  HAS_E_SIM=  'HAS_E_SIM',
  OPERATING_SYSTEM= 'OPERATING_SYSTEM',
  REFURBISHED= 'REFURBISHED',
} 

export type Filters = {
  [key in keyof typeof FilterType]?: string[]
}

export type FilterFunc = (product: Product, filterValue: string) => boolean
export type FilterFunctionMapping = {
  [key in keyof typeof FilterType]: FilterFunc
}

export interface FilterListItem {
  id: number
  value: string
  label: string
}


export interface Product {
  manufacturer: string
  colors: string[]
  has_5g: boolean
  has_esim: boolean
  operating_system: string
  refurbished: boolean
}