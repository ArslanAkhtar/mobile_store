<script setup lang="ts">
import { reactive, toRefs, onMounted } from 'vue'
import { Filters, FilterType, Product } from '../helpers/types'
import useFilters from '../composables/filters'
import { applyFilters } from '../helpers/filters'


// const {
//   brands,
//   colors,
//   fiveGFilter,
//   besturingssysteemFilter,
//   eSimFilter,
//   refurbishedFilter,
//   filters,
//   filtersCheck
// } = helperFunctions



const state = reactive({
  onHover: true,
  models: {},
  merk: false,
  kleur: false,
  fiveG: false,
  // besturingssysteem: false,
  // eSim: false,
  // refurbished: false,
  // meestverkocht: false,
  // isVisible: !filtersCheck(),
  // selectedBrands: [] as string[],
  // selectedColors: [] as string[],
  // selectedFiveG: '',
  // selectedOperatingSystem: [] as string[],
  // selectedESim: '',
  // selectedRefurbished: ''
})

const {
  merk,
  kleur,
  fiveG,
  models
  // besturingssysteem,
  // eSim,
  // refurbished,
  // meestverkocht,
  // isVisible,
  // selectedBrands,
  // selectedColors,
  // selectedFiveG,
  // selectedOperatingSystem,
  // selectedESim,
  // selectedRefurbished
} = toRefs(state)

// const foo = useFilters()\

const { products, filters } =defineProps<{
  products: Product[]
  filters: Filters
}>()

const filteredProducts = applyFilters(products, filters)

function getPossibleFilterValues(products: Product[], key: keyof Product) {
  const values =  products.reduce((prev, cur) => {
    const value = cur[key]
    if(value instanceof Array) {
      return [...prev, ...value]
    } else if(typeof value === 'boolean') {
      return [...prev, value ? 'true': 'false']
    } else {
      return [...prev, value]
    }

  }, new Array<string>)

  return [...new Set(values)]
}

const emit = defineEmits<{
  (e: 'addFilter', type: FilterType, value: string): void
  (e: 'removeFilter', type: FilterType, value: string): void
}>()


const onResize = () => {
  if (window.innerWidth < 1024) {
    // state.onHover = false
  }
}

console.log(filters)

const isSelected = (type: FilterType, value: string) => {
  return (filters[type] || []).some((v) => v===value)
}

const filterList: Array<{ type: FilterType, key: keyof Product, label: string }> = [{
  type: FilterType.MANUFACTURER,
  key: 'manufacturer',
  label: 'Brand'
}, {
  type: FilterType.COLORS,
  key: 'colors',
  label: 'Colors'
}, {
  type: FilterType.HAS_FIGE_G,
  key: 'has_5g',
  label: '5G'
}, {
  type: FilterType.OPERATING_SYSTEM,
  key: 'operating_system',
  label: 'Operating System'
}, {
  type: FilterType.HAS_E_SIM,
  key: 'has_esim',
  label: 'E-sim'
}, {
  type: FilterType.REFURBISHED,
  key: 'refurbished',
  label: 'Refurbished'
}]

console.log(getPossibleFilterValues(filteredProducts, 'manufacturer'))

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
      v-for="({key, type, label}, index) in filterList"
      v-bind:key="index"
      v-model="models[key]"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> {{ label }} </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            v-for="(value, index) in getPossibleFilterValues(filteredProducts, key)"
            :class="{
              'checkbox-item-checked': isSelected(type, value),
              'mt-2': index === 0,
              // 'mb-2': index !== brands.length - 1
            }"
            :key="value"
            @click="emit('addFilter', type, value)"
          >
            {{ value }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
<!--
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
    </v-menu> -->
  </v-toolbar>
  <!-- <div class="ma-5 filters-wrapper" v-if="isVisible">
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
  </div> -->
</template>
