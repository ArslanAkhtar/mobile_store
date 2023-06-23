<script setup lang="ts">
import phone from '@/assets/cards/phone.svg'
import snelpakker from '@/assets/cards/snelpakker.svg'
import type { Product } from '../helpers/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <v-card class="mx-auto pa-8" max-width="300">
    <v-img class="align-end text-white" max-height="400" :src="phone" contain>
      <div class="image-container">
        <v-img class="text-white image-item" max-width="60%" :src="snelpakker" cover />
      </div>
      <div class="ma-5 ml-0 text-black pa-3 bg-gradient-green font-weight-bold">
        Super competitively priced + €100 return
      </div>
    </v-img>

    <v-card-subtitle class="pt-4"> {{ product.model }} </v-card-subtitle>

    <v-card-text>
      {{ product.name }}
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" fill> Explore </v-btn>
    </v-card-actions>
  </v-card>
</template>
