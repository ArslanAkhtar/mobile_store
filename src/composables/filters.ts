import { ref } from 'vue'
import { FilterType, type Filters } from '@/helpers/types'

export default function useFilters() {

  const filters = ref<Filters>({})

  function addFilter (type: FilterType, value: string) {
    // We don't want to allow values to be duplicated
    const values = filters.value[type] || []
    console.log('Adding filter', type, value, values)
    if(values.includes(value)) {
      return // no need to add the value; it's already in the filter list
    } else {
      console.log('WHOOT')
      filters.value = {
        ...filters.value,
        [type]: [...values, value]
      }
    }
  }

  return {
    filters: filters.value,
    addFilter: addFilter,
    removeFilter: (type: FilterType, value: string) => {
      // We don't want to allow values to be duplicated
      const values = filters.value[type] || []

      filters.value = {
        ...filters.value,
        [type]: values.filter((v) => v !== value)
      }
    },
    reset: () => {
      filters.value =  {}
    }
  }

}