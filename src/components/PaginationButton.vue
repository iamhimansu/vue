<script>
export default {
  name: "PaginationButton",
  props: {
    pageSize: Number,
    totalCount: Number,
    select: Function
  },
  data() {
    return {
      totalButtons: () => {
        return this.totalCount * 0.05;
      },
      currentPage: 0
    }
  },
  methods: {
    handlePagination(page) {
      this.select(this.pageSize, ((page - 1) * this.pageSize));
      this.currentPage = page;
    }
  }
}
</script>

<template>
  <div class="my-3">
    <div class="flex flex-row place-items-center justify-center">
      <div v-for="i in totalButtons()" :key="i">
        <button :class="currentPage === i ? 'bg-black text-white' : 'text-black'" class="border w-6 p-2 text-xs px-4"
                @click="handlePagination(i)">
          {{
            i
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>