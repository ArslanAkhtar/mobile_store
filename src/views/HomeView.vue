<script setup lang="ts">
import SiteContent from '@/components/SiteContent.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <main>
    <v-app id="mobile-store">
      <SiteHeader />
      <SiteContent />
      <SiteFooter />
    </v-app>
  </main>
</template>
