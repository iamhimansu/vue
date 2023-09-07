<script>

import TopNavBar from "@/components/TopNavBar.vue";

export default {
  components: {TopNavBar}
}
</script>

<template>
  <div class="pb-20 md:pb-0 md:pl-20">
    <top-nav-bar></top-nav-bar>
    <div class="px-0 sm:px-4">
      <router-view>
      </router-view>
    </div>
  </div>
</template>

<style scoped>

</style>