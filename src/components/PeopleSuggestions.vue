<script>
import PaginationButton from "@/components/PaginationButton.vue";

export default {
  name: "PeopleSuggestions",
  components: {PaginationButton},
  props: {
    users: Array,
    totalCount: Number,
    pageSize: Number,
    select: Function
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div>
    <div class="my-0">
      <h2 class="font-bold text-sm">
      <i class="bi bi-people"></i>
        People who to follow
      </h2>
    </div>
    <div v-for="(people, i) in users" :key="i">
      <div class="flex flex-row place-items-center gap-1 h-12 w-full p-2 my-1">
        <div class="w-1/6">
          <img alt="Rounded avatar" class="w-8 h-8 rounded-full"
               src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"/>
        </div>
        <div class="flex flex-col w-5/6">
          <div class="text-xs font-bold">{{ people.name }}</div>
        </div>
        <div>
          <button class="p-2 px-8 border rounded-full text-xs font-bold hover:bg-black hover:text-white w-20 h-8">
            <span>Follow</span>
          </button>
        </div>
      </div>
    </div>
    <pagination-button :page-size="pageSize" :select="select" :total-count="totalCount"></pagination-button>
  </div>
</template>

<style scoped>

</style>