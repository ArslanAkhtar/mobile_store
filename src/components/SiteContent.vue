<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SiteFilter from "./SiteFilter.vue";
import SiteCard from "./SiteCard.vue";
import useProducts from "./../composables/products";
import useFilters from "../composables/filters";
import { applyFilters } from "../helpers/filters";
import { sortFunctionMapping } from "@/helpers/sorting";
import type { SortFunctionMapping } from "@/helpers/types";

const { filters, toggleFilter, removeFilter } = useFilters();
const { data, isFinished } = useProducts();

// const filteredProducts = computed(() =>
//   applyFilters(data.value || [], filters.value)
// );

const selectedSort = ref("" as keyof SortFunctionMapping);
const selectSort = (sort: keyof SortFunctionMapping) => {
  selectedSort.value = sort;
};

const filteredProducts = computed(() => {
  const filtered = applyFilters(data.value || [], filters.value);
  const sortFunction = sortFunctionMapping[selectedSort.value];
  return sortFunction ? sortFunction(filtered) : filtered;
});
</script>
<template>
  <v-main>
    <v-container>
      <div class="text-h3 pa-5 pl-0">
        Choose from {{ filteredProducts.length }} phones
      </div>
      <SiteFilter
        v-if="data !== null"
        :products="data"
        :filters="filters"
        :selectedSort="selectedSort"
        @toggleFilter="toggleFilter"
        @removeFilter="removeFilter"
        @selectSort="selectSort"
      />
      <v-row class="pa-5 pl-0 pr-0" v-if="isFinished">
        <v-col
          class="product-list"
          v-for="product in filteredProducts"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          xl="2"
        >
          <SiteCard :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
