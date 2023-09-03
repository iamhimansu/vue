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
    <div class="my-5">
      <h2 class="font-bold">People you might be interested</h2>
    </div>
    <div v-for="(people, i) in users" :key="i">
      <div class="flex flex-row place-items-center gap-1 h-16 w-full p-2 my-1">
        <div class="w-1/5">
          <img alt="Rounded avatar" class="w-12 h-12 rounded-full"
               src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"/>
        </div>
        <div class="flex flex-col w-3/5">
          <div class="text-xs font-bold">{{ people.name }}</div>
          <div class="text-[11px] line-clamp-2 leading-tight text-gray-800">{{ people.category }}
          </div>
        </div>
        <div>
          <button class="p-2 px-12 border rounded-full text-xs font-bold hover:bg-gray-100">
            <span>Follow</span>
          </button>
        </div>
      </div>
    </div>
    <PaginationButton :page-size="pageSize" :select="select" :total-count="totalCount"></PaginationButton>
  </div>
</template>

<style scoped>

</style>