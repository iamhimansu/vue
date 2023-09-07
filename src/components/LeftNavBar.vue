<script>
import {mapGetters} from "vuex";

export default {
  name: "LeftNavBar",
  props: {
    visible: Boolean,
    currentActiveLeftNav: String,
    setCurrentActiveLeftNav: Function
  },
  computed: {
    ...mapGetters(['getDB']),
  },
  data() {
    return {
      isVisible: true
    }
  },
  methods: {
    exportDb() {
      this.$store.dispatch('downloadDb', this.getDB)
    },
    uploadDb() {
      this.$store.dispatch('uploadDBFileToGithub')
    },
  },

}
</script>

<template>
  <div v-if="isVisible"
       class="w-screen md:w-20 flex justify-evenly md:flex-none md:block fixed bottom-0 md:top-0 h-16 md:h-screen p-4 border border-r bg-white z-50">
    <div
        class="w-11 h-10 group hover:bg-black hidden md:inline-block hover:text-white text-center leading-10 rounded-md font-bold text-2xl mb-16">
      <router-link class="group-hover:bg-black group-hover:text-white" to="/">H</router-link>
    </div>
    <div
        class="w-full flex flex-row md:flex-col gap-x-1 md:gap-y-6 place-items-center md:justify-center justify-evenly flex-no-wrap">
      <button :class="{'bg-black text-white': this.currentActiveLeftNav === 'home'}"
              class="hover:bg-gray-100 w-11 h-10 rounded-md" @click="setCurrentActiveLeftNav('home')">
        <router-link to="/home">
          <i class="bi bi-house-door text-xl"></i>
        </router-link>
      </button>
      <button :class="{'bg-black text-white': this.currentActiveLeftNav === 'notifications'}"
              class="hover:bg-gray-100 w-11 h-10 rounded-md" @click="setCurrentActiveLeftNav('notifications')">
        <i class="bi bi-bell text-xl -rotate-12"></i>
      </button>
      <button :class="{'bg-black text-white': this.currentActiveLeftNav === 'dashboard'}"
              class="hover:bg-gray-100 w-11 h-10 rounded-md" @click="setCurrentActiveLeftNav('dashboard')">
        <i class="bi bi-layout-wtf text-xl"></i>
      </button>
      <button :class="{'bg-black text-white': this.currentActiveLeftNav === 'bookmarks'}"
              class="hidden hover:bg-gray-100 w-11 h-10 rounded-md" @click="setCurrentActiveLeftNav('bookmarks')">
        <i class="bi bi-bookmarks text-xl"></i>
      </button>
      <!--      <button class="hover:bg-gray-100 w-11 h-10 rounded-md">
              <i class="bi bi-hash text-xl"></i>
            </button>-->
      <button :class="{'bg-black text-white': this.currentActiveLeftNav === 'edit'}"
              class="hover:bg-gray-100 w-11 h-10 rounded-md"
              @click="setCurrentActiveLeftNav('edit')">
        <router-link to="/create">
          <i class="bi bi-pencil-square text-xl"></i>
        </router-link>
      </button>
      <button class="hidden md:flex flex-row place-items-center hover:bg-gray-100 font-bold p-2 px-4 text-xs space-x-2"
              @click="exportDb"
      >
        <i class="bi bi-database-down text-lg"></i>
      </button>
      <button class="flex flex-row place-items-center hover:bg-gray-100 font-bold p-2 px-4 text-xs space-x-2"
              @click="uploadDb"
      >
        <i class="bi bi-database-up text-lg"></i>
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>