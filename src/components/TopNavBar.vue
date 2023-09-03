<script>
export default {
  name: "TopNavBar"
}
</script>

<template>
  <nav
      class="flex-no-wrap flex w-full bg-gray-50 max-w-full h-16 border-b place-items-center p-2 flex-row justify-between px-6 fixed top-0">
    <div class="h-full">
      <router-link to="/">
        <button class="hover:bg-gray-100 h-full"><i class="bi bi-justify text-2xl"></i></button>
      </router-link>

    </div>
    <div class="reader uppercase font-bold">
      <router-link to="/home">reader</router-link>
    </div>
    <div class="w-10 flex flex-row justify-end space-x-2">
      <button class="hover:bg-gray-100 p-2">
        <i class="bi bi-bell text-lg"></i>
      </button>
      <router-link class="hover:bg-gray-100 p-2" to="/login">
        <i class="bi bi-person text-lg"></i>
      </router-link>
      <router-link class="flex flex-row place-items-center hover:bg-gray-100 font-bold p-2 px-4 text-xs space-x-2"
                   to="/create">
        <i class="bi bi-pencil-square text-lg"></i>
      </router-link>
    </div>
  </nav>
</template>

<style scoped>

</style>
