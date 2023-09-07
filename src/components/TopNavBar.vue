<script>

import GlobalSearch from "@/components/GlobalSearch.vue";

export default {
  name: "TopNavBar",
  components: {GlobalSearch},

}
</script>

<template>
  <div class="w-full h-16 border-b flex place-items-center">
    <div class="flex w-9/12 md:w-8/12 md:place-items-center md:pl-20">
    <global-search></global-search>
    </div>
    <div class="w-full md:w-4/12 flex justify-end md:place-content-between px-4">
        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span class="font-medium text-gray-600 dark:text-gray-300">H</span>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>
