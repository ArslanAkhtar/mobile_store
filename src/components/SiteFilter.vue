<script setup lang="ts">
import { reactive, toRefs, onMounted, ref } from "vue";
import { applyFilters } from "../helpers/filters";
import type { Filters, Product } from "../helpers/types";
import { FilterType }from "../helpers/types";

const menuStates = ref<{ [key: string]: boolean }>({});

defineProps<{
  products: Product[];
  filters: Filters;
}>();

function getPossibleFilterValues(products: Product[], key: keyof Product, filters: Filters, type: FilterType) {
  
  // In order to determine what we can select for this given filters we need to apply them to the product list; except for the filter we're currently looking at
  const filteredProducts = applyFilters(products, {
    ...filters,
    [type]: []
  })

  const vals = filteredProducts.reduce((prev, cur) => {
    const value = cur[key];
    if (value instanceof Array) {
      return [...prev, ...value];
    } else if (typeof value === "boolean") {
      return [...prev, value ? "true" : "false"];
    } else if (typeof value === "number") {
      return [...prev, value.toString()];
    } else {
      return [...prev, value];
    }
  }, new Array<string>());

  return [...new Set(vals)];
}

const emit = defineEmits<{
  (e: "toggleFilter", type: FilterType, value: string): void;
  (e: "removeFilter", type: FilterType, value: string): void;
}>();

const onResize = () => {
  if (window.innerWidth < 1024) {
    // state.onHover = false
  }
};

const isSelected = (filters: Filters, type: FilterType, value: string) => {
  return (filters[type] || []).some((v) => v === value);
};

const filterList: {
  [key in keyof typeof FilterType]: {
    key: keyof Product;
    label: string;
    removeButtonPrefix?: string
  }
} = {
  [FilterType.MANUFACTURER]: {
    key: "manufacturer",
    label: "Brand",
  },
  [FilterType.COLORS]: {
    
    key: "colors",
    label: "Colors",
  },
  [FilterType.HAS_FIGE_G]: {

    key: "has_5g",
    label: "5G",
    removeButtonPrefix: '5G: '
  },
  [FilterType.OPERATING_SYSTEM]: {

    key: "operating_system",
    label: "Operating System",
  },
  [FilterType.HAS_E_SIM]: {
    key: "has_esim",
    label: "E-sim",
    removeButtonPrefix: 'E-sim: '
  },
  [FilterType.REFURBISHED]: {

    key: "refurbished",
    label: "Refurbished",
  },
};

onMounted(() => {
  onResize();
});
</script>
<template>
  hello
  <v-toolbar class="toolbar-wrapper" v-resize="onResize">
    <v-menu
      v-for="({ key, label }, type, index) in filterList"
      v-bind:key="index"
      v-model="menuStates[key]"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" append-icon="mdi-menu-down"> {{ label }} </v-btn>
      </template>

      <v-card class="pl-4 pr-4">
        <v-list>
          <v-list-item
            v-for="(value) in getPossibleFilterValues(products, key, filters, type)"
            :class="{
              'checkbox-item-checked': isSelected(filters, type, value),
            }"
            :key="value"
            @click="emit('toggleFilter', type, value)"
          >
            {{ value }}
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    

    <v-spacer></v-spacer>

    <div class="text-h6">Sort by:</div>

    <v-menu
      v-model="menuStates['orderBy']"
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
  <div class="ma-5 filters-wrapper">
    <div class="filter-item" v-for="(values, key) in filters" :key="key">
      <div>
        <v-btn
          class="mr-3 mb-3"
          v-for="(value, index) in values"
          :key="index"
          @click="emit('removeFilter', key, value)"
          >{{ `${filterList[key].removeButtonPrefix || ''}${value}` }}</v-btn
        >
      </div>
    </div>
  </div>
</template>
