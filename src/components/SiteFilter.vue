<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { FilterTypes } from '@/helpers/enum'
import { type Filters } from '@/helpers/types'
import helperFunctions from '@/composables/helperFunctions'

const {
  brands,
  colors,
  fiveGFilter,
  besturingssysteemFilter,
  eSimFilter,
  refurbishedFilter,
  filters,
  filtersCheck
} = helperFunctions

const emit = defineEmits<{
  (e: 'applyFilters'): void
}>()

const state = reactive({
  onHover: true,
  merk: false,
  kleur: false,
  fiveG: false,
  besturingssysteem: false,
  eSim: false,
  refurbished: false,
  meestverkocht: false,
  isVisible: !filtersCheck(),
  selectedBrands: [] as string[],
  selectedColors: [] as string[],
  selectedFiveG: '',
  selectedOperatingSystem: [] as string[],
  selectedESim: '',
  selectedRefurbished: ''
})

const isSelected = (value: string, searchArray: string[]) => {
  return searchArray.includes(value)
}

const handleSelectedArray = (selectedArray: string[], value: string) => {
  const filterArray = selectedArray as string[]

  if (filterArray.includes(value)) {
    return filterArray.filter((item) => item !== value)
  } else {
    return [...filterArray, value]
  }
}

const handleCheckboxChange = (value: string, index: number, filtertype: string) => {
  state.isVisible = false

  const filterName: keyof Filters = filtertype as keyof Filters

  switch (filtertype) {
    case FilterTypes.Brands:
      state.selectedBrands = handleSelectedArray(state.selectedBrands, value)
      filters[filterName] = state.selectedBrands
      break
    case FilterTypes.Colors:
      state.selectedColors = handleSelectedArray(state.selectedColors, value)
      filters[filterName] = state.selectedColors
      break
    case FilterTypes.FiveG:
      state.selectedFiveG = state.selectedFiveG === value ? '' : value
      filters[filterName] = state.selectedFiveG
      break
    case FilterTypes.OperatingSystem:
      state.selectedOperatingSystem = handleSelectedArray(state.selectedOperatingSystem, value)
      filters[filterName] = state.selectedOperatingSystem
      break
    case FilterTypes.ESim:
      state.selectedESim = state.selectedESim === value ? '' : value
      filters[filterName] = state.selectedESim
      break
    case FilterTypes.Refurbished:
      state.selectedRefurbished = state.selectedRefurbished === value ? '' : value
      filters[filterName] = state.selectedRefurbished
      break
    case 'meestverkocht':
      break
  }
  emit('applyFilters')
  state.isVisible = !filtersCheck()
}

const uncheckCheckbox = (value: string | boolean, key: string) => {
  state.isVisible = false
  const filterName: keyof Filters = key as keyof Filters
  switch (key) {
    case FilterTypes.Brands:
      state.selectedBrands = state.selectedBrands.filter((item) => item !== value)
      filters[filterName] = state.selectedBrands
      break
    case FilterTypes.Colors:
      state.selectedColors = state.selectedColors.filter((item) => item !== value)
      filters[filterName] = state.selectedColors
      break
    case FilterTypes.FiveG:
      state.selectedFiveG = ''
      filters[filterName] = state.selectedFiveG
      break
    case FilterTypes.OperatingSystem:
      state.selectedOperatingSystem = state.selectedOperatingSystem.filter((item) => item !== value)
      filters[filterName] = state.selectedOperatingSystem
      break
    case FilterTypes.ESim:
      state.selectedESim = ''
      filters[filterName] = state.selectedESim
      break
    case FilterTypes.Refurbished:
      state.selectedRefurbished = ''
      filters[filterName] = state.selectedRefurbished
      break
    case 'meestverkocht':
      break
  }
  emit('applyFilters')
  state.isVisible = !filtersCheck()
}

const {
  merk,
  kleur,
  fiveG,
  besturingssysteem,
  eSim,
  refurbished,
  meestverkocht,
  isVisible,
  selectedBrands,
  selectedColors,
  selectedFiveG,
  selectedOperatingSystem,
  selectedESim,
  selectedRefurbished
} = toRefs(state)

const onResize = () => {
  if (window.innerWidth < 1024) {
    state.onHover = false
  }
}

onMounted(() => {
  onResize()
})
</script>
/** 
* TODO: There is lot of code duplication here, we can make it more generic and reuse it forall filters 
* TODO: We can create json for filters details and use it here or we can create a generic component for filter button and pass the data from here 
*/
<template>
  <v-toolbar class="toolbar-wrapper" v-resize="onResize">

    <v-menu
      :open-on-hover="state.onHover"
      v-model="merk"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> Merk </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            :class="{
              'checkbox-item-checked': isSelected(brand.value, selectedBrands),
              'mt-2': index === 0,
              'mb-2': index !== brands.length - 1
            }"
            v-for="(brand, index) in brands"
            :key="brand.id"
            @click="handleCheckboxChange(brand.value, index, FilterTypes.Brands)"
          >
            {{ brand.label }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      :open-on-hover="state.onHover"
      v-model="kleur"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> Kleur </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            :class="{
              'checkbox-item-checked': isSelected(color.value, selectedColors),
              'mt-2': index === 0,
              'mb-2': index !== colors.length - 1
            }"
            v-for="(color, index) in colors"
            :key="color.id"
            @click="handleCheckboxChange(color.value, index, FilterTypes.Colors)"
          >
            {{ color.label }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      :open-on-hover="state.onHover"
      v-model="fiveG"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> 5G </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            :class="{
              'checkbox-item-checked': selectedFiveG === filter.value,
              'mt-2': index === 0,
              'mb-2': index !== fiveGFilter.length - 1
            }"
            class="mt-2 mb-2"
            v-for="(filter, index) in fiveGFilter"
            :key="filter.id"
            @click="handleCheckboxChange(filter.value, index, FilterTypes.FiveG)"
          >
            {{ filter.label }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      v-model="besturingssysteem"
      :close-on-content-click="false"
      transition="scale-transition"
      :open-on-hover="state.onHover"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> Besturingssysteem </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            :class="{
              'checkbox-item-checked': isSelected(Item.value, selectedOperatingSystem),
              'mt-2': index === 0,
              'mb-2': index !== besturingssysteemFilter.length - 1
            }"
            v-for="(Item, index) in besturingssysteemFilter"
            :key="Item.id"
            @click="handleCheckboxChange(Item.value, index, FilterTypes.OperatingSystem)"
          >
            {{ Item.label }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      :open-on-hover="state.onHover"
      v-model="eSim"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> E-Sim </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            :class="{
              'checkbox-item-checked': selectedESim === filter.value,
              'mt-2': index === 0,
              'mb-2': index !== eSimFilter.length - 1
            }"
            class="mt-2 mb-2"
            v-for="(filter, index) in eSimFilter"
            :key="filter.id"
            @click="handleCheckboxChange(filter.value, index, FilterTypes.ESim)"
          >
            {{ filter.label }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      :open-on-hover="state.onHover"
      v-model="refurbished"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> Refurbished </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            :class="{
              'checkbox-item-checked': selectedRefurbished === filter.value,
              'mt-2': index === 0,
              'mb-2': index !== refurbishedFilter.length - 1
            }"
            class="mt-2 mb-2"
            v-for="(filter, index) in refurbishedFilter"
            :key="filter.id"
            @click="handleCheckboxChange(filter.value, index, FilterTypes.Refurbished)"
          >
            {{ filter.label }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-spacer></v-spacer>

    <div class="text-h6">Sort by:</div>

    <v-menu
      :open-on-hover="state.onHover"
      v-model="meestverkocht"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-unfold-more-horizontal"> Meest verkocht </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item> Not Implemented </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-toolbar>
  <div class="ma-5 filters-wrapper" v-if="isVisible">
    <div class="filter-item" v-for="(value, key) in filters" :key="key">
      <div v-if="key !== 'fiveG'">
        <v-btn
          class="mr-3 mb-3"
          v-for="(item, index) in value"
          :key="index"
          @click="uncheckCheckbox(item, key)"
          >{{ item }}</v-btn
        >
      </div>
      <div
        v-if="
          (key === FilterTypes.FiveG ||
            key === FilterTypes.ESim ||
            key === FilterTypes.Refurbished) &&
          typeof value === 'boolean'
        "
      >
        <v-btn class="mr-3 mb-3" :key="key" @click="uncheckCheckbox(value, key)">{{
          key + ' : ' + value
        }}</v-btn>
      </div>
    </div>
  </div>
</template>
