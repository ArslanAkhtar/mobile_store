<script setup lang="ts">
import SiteFilter from '@/components/SiteFilter.vue'
import SiteCard from '@/components/SiteCard.vue'
import { onMounted } from 'vue'

// import helperFunctions from '@/composables/helperFunctions'
// const fetchProducts = helperFunctions.fetchProducts
// const applyFilters = helperFunctions.applyFilters
// const filteredProducts = helperFunctions.filteredProducts

import useProducts from './../composables/products'
import useFilters from '../composables/filters'

const { filters, addFilter, removeFilter } = useFilters()
const { data, isFetching } = useProducts()

console.log('sdflksajfls;kfjdksl;j')
console.log(filters)

onMounted(async () => {
  // await fetchProducts()
})
</script>
/** 
* TODO: For App responsiveness we can create new filter component for small devices like mobiles and tablets and use it here with v-if
* TODO: Error handling for fetchProducts()
* TODO: Add loading spinner for fetchProducts()
* TODO: Error Handling for filter selection if no products are found 
*/
<template>
  <v-main>
    <v-container>
      <!-- <div class="text-h3 pa-5 pl-0">Choose from {{filteredProducts !== null ? filteredProducts.length: "52" }} phones</div> -->
      <SiteFilter v-if="data !== null" :products="data" :filters="filters" @addFilter="addFilter" @removeFilter="removeFilter" />
      <!-- <v-row class="pa-5 pl-0 pr-0" v-if="filteredProducts != null">
        <v-col class="product-list" v-for="product in filteredProducts" :key="product" cols="12" sm="6" md="4" xl="2">
          <SiteCard :product="product" />
        </v-col>
      </v-row> -->
    </v-container>
  </v-main>
</template>
