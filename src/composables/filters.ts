import { ref } from 'vue'
import { FilterType, type Filters } from '@/helpers/types'

export default function useFilters() {

  const filters = ref<Filters>({})

  function addFilter (type: FilterType, value: string) {
    // We don't want to allow values to be duplicated
    const values = filters.value[type] || []

    if(!values.includes(value)) {
      filters.value = {
        ...filters.value,
        [type]: [...values, value]
      }
    }
  }

  function removeFilter(type: FilterType, value: string) {
    const values = filters.value[type] || []

    filters.value = {
      ...filters.value,
      [type]: values.filter((v) => v !== value)
    }
  }

  function toggleFilter(type: FilterType, value: string) {
    // We don't want to allow values to be duplicated
    const values = filters.value[type] || []
    if(values.includes(value)) {
      removeFilter(type, value)
    } else {
      addFilter(type, value)
    }
  }

  return {
    filters: filters,
    addFilter: addFilter,
    removeFilter: removeFilter,
    toggleFilter: toggleFilter,
    reset: () => {
      filters.value =  {}
    }
  }

}