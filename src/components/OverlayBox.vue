<script>
export default {
  name: "OverlayBox",
  props: {
    lists: Array
  }
}
</script>

<template>
  <div class="fixed z-50 w-screen h-screen backdrop-blur-sm p-8 top-0">
    <div class="relative w-full md:w-160 mx-auto shadow-2xl bg-white rounded-md border p-8 my-8">
      <ul class="list-item list-disc ml-4 text-xs">
        <li v-for="(list, index) in lists" :key="index">
          {{ list.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>