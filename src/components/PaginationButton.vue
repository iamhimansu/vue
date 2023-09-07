<script>
export default {
  name: "PaginationButton",
  props: {
    pageSize: Number,
    totalCount: Number,
    select: Function,
    buttonLength: Number
  },
  data() {
    return {
      currentPage: 0,
      totalButtons: () => {
        return Math.ceil(this.totalCount / this.pageSize);
      },
    }
  },
  methods: {
    handlePagination(page) {
      this.currentPage = page - 1;
      this.select(this.pageSize, (this.currentPage * this.pageSize));
    }
  }
}
/**
 * 0, 1, 2, 3, 4
 * total count: 20
 * per page: 10
 * buttons to create: x
 * x = 20/10 <- ceil
 */
</script>

<template>
  <div class="my-3">
    <div class="flex flex-row place-items-center justify-center">
      <div v-for="i in totalButtons()" :key="i">
        <button :class="(currentPage+1) === i  ? 'bg-black text-white' : 'text-black'"
                class="border w-6 p-2 text-xs px-4"
                @click="handlePagination(i)">
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>