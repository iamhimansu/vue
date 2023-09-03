<script>
export default {
  name: "ErrorSummary",
  props: {
    errors: Array
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div v-if="errors.length" class="w-full border border-red-300 rounded p-2 bg-red-50 text-xs mb-3">
    <ul class="list-item list-disc ml-4">
      <li v-for="(error, index) in errors" :key="index" class="text-red-600">
        {{ errors[index]?.message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>