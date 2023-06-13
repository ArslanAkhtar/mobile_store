import { ref, reactive } from 'vue'

import { type Filters, type FilterListItem } from '@/helpers/types'

import { serverAddress } from '@/helpers/constants'

import { FilterTypes } from '@/helpers/enum'

const filters: Filters = reactive({
  brands: [],
  colors: [],
  fiveG: '',
  operatingSystem: [],
  eSim: '',
  refurbished: '',
  bestSellers: []
})

/** 
 * ! Things to improve
* TODO: Need to work on Filter Logic and can improve applyFilters function by creating another generic helper function for each filter to remove code duplication.
* TODO: Need to remove 'any' because it is the bad practice to use any in typescript. Unknown or type creation can be used instead.
* TODO: Might can make separate composable for fetching and filtering products.
*/

const brands: FilterListItem[] = reactive([])
const colors: FilterListItem[] = reactive([])
const fiveGFilter: FilterListItem[] = reactive([])
const besturingssysteemFilter: FilterListItem[] = reactive([])
const eSimFilter: FilterListItem[] = reactive([])
const refurbishedFilter: FilterListItem[] = reactive([])
const fetchedProductList = ref<any>(null)
const filteredProducts = ref<any>(null)

const filtersCheck = (): boolean => {
  return Object.values(filters).every((array) => array.length === 0)
}

async function fetchProducts() {
  const res = await fetch(serverAddress)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch products')
  }

  fetchedProductList.value = data.products
  filteredProducts.value = data.products

  createFilterListItems(fetchedProductList.value, brands, 'manufacturer')
  createFilterListItems(fetchedProductList.value, colors, 'colors', true)
  createFilterListItems(fetchedProductList.value, fiveGFilter, 'has_5g')
  createFilterListItems(fetchedProductList.value, besturingssysteemFilter, 'operating_system')
  createFilterListItems(fetchedProductList.value, eSimFilter, 'has_esim'),
  createFilterListItems(fetchedProductList.value, refurbishedFilter, 'refurbished')
}

function applyFilter(products: any, filterValues: any, key: string) {
  if (key === 'has_5g' || key === 'has_esim' || key === 'refurbished') {
    const filteredProducts = products.filter((item: any) => item[key] === filterValues)
    return filteredProducts
  }

  return filterValues.reduce((filtered: any, filter: any) => {
    const matches = products.filter((product: any) => {
      if (key === FilterTypes.Colors) {
        return product[key].includes(filter)
      } else {
        return product[key].toLowerCase() === filter.toLowerCase()
      }
    })

    return [...filtered, ...matches]
  }, [])
}



function applyFilters() {
  let products = [...fetchedProductList.value]
  if (filtersCheck()) {
    createFilterListItems(fetchedProductList.value, brands, 'manufacturer')
    createFilterListItems(fetchedProductList.value, colors, 'colors', true)
    createFilterListItems(fetchedProductList.value, fiveGFilter, 'has_5g')
    createFilterListItems(fetchedProductList.value, besturingssysteemFilter, 'operating_system')
    createFilterListItems(fetchedProductList.value, eSimFilter, 'has_esim')
    createFilterListItems(fetchedProductList.value, refurbishedFilter, 'refurbished')
    filteredProducts.value = products
    return
  }

  if (filters.brands.length > 0) {
    products = [...new Set(applyFilter(products, filters.brands, 'manufacturer'))]
    createFilterListItems(products, colors, 'colors', true)
    createFilterListItems(products, fiveGFilter, 'has_5g')
    createFilterListItems(products, besturingssysteemFilter, 'operating_system')
    createFilterListItems(fetchedProductList.value, eSimFilter, 'has_esim')
    createFilterListItems(fetchedProductList.value, refurbishedFilter, 'refurbished')
  }

  if (filters.colors.length > 0) {
    products = [...new Set(applyFilter(products, filters.colors, 'colors'))]
    createFilterListItems(products, brands, 'manufacturer')
    createFilterListItems(products, fiveGFilter, 'has_5g')
    createFilterListItems(products, besturingssysteemFilter, 'operating_system')
    createFilterListItems(products, eSimFilter, 'has_esim')
    createFilterListItems(products, refurbishedFilter, 'refurbished')
  }

  if (filters.fiveG !== '') {
    products = [...new Set(applyFilter(products, filters.fiveG, 'has_5g'))]
    createFilterListItems(products, brands, 'manufacturer')
    createFilterListItems(products, colors, 'colors', true)
    createFilterListItems(products, besturingssysteemFilter, 'operating_system')
    createFilterListItems(products, eSimFilter, 'has_esim')
    createFilterListItems(products, refurbishedFilter, 'refurbished')
  }

  if (filters.operatingSystem.length > 0) {
    products = [...new Set(applyFilter(products, filters.operatingSystem, 'operating_system'))]
    createFilterListItems(products, brands, 'manufacturer')
    createFilterListItems(products, colors, 'colors', true)
    createFilterListItems(products, fiveGFilter, 'has_5g')
    createFilterListItems(products, eSimFilter, 'has_esim')
    createFilterListItems(products, refurbishedFilter, 'refurbished')
  }

  if (filters.eSim !== '') {
    products = [...new Set(applyFilter(products, filters.eSim, 'has_esim'))]
    createFilterListItems(products, brands, 'manufacturer')
    createFilterListItems(products, colors, 'colors', true)
    createFilterListItems(products, fiveGFilter, 'has_5g')
    createFilterListItems(products, besturingssysteemFilter, 'operating_system')
    createFilterListItems(products, refurbishedFilter, 'refurbished')
  }

  if (filters.refurbished !== '') {
    products = [...new Set(applyFilter(products, filters.refurbished, 'refurbished'))]
    createFilterListItems(products, brands, 'manufacturer')
    createFilterListItems(products, colors, 'colors', true)
    createFilterListItems(products, fiveGFilter, 'has_5g')
    createFilterListItems(products, besturingssysteemFilter, 'operating_system')
    createFilterListItems(products, eSimFilter, 'has_esim')
  }

  filteredProducts.value = products
}

function createFilterListItems(
  products: any,
  list: FilterListItem[],
  key: string,
  isNestedArray = false
) {
  const uniqueValues = new Set()

  products.forEach((product: any) => {
    if (isNestedArray && Array.isArray(product[key])) {
      product[key].forEach((value: any) => {
        uniqueValues.add(value)
      })
    } else {
      uniqueValues.add(product[key])
    }
  })
  // Note: Created uniqueValues set to remove duplicate products for the list.
  // Note: It creates a List of products from the given products array which has key in it.
  // Note: To remove duplicate products from the list, we are using Set.


  list.splice(
    0,
    list.length,
    ...[...uniqueValues].map((value: any, index: number) => {
      return {
        id: index,
        value,
        label: value
      }
    })
  )

  // Note: Splice is used to remove all the elements from the list and add new elements to the list
  // Note: Here we are using spread operator to convert set to array and then using map to create a list of products from the given products array which has key in it.
}

export default {
  filters,
  brands,
  colors,
  fiveGFilter,
  besturingssysteemFilter,
  eSimFilter,
  refurbishedFilter,
  fetchedProductList,
  filteredProducts,
  fetchProducts,
  applyFilters,
  filtersCheck
}
