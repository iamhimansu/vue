<template>
  <top-nav-bar></top-nav-bar>
  <content-padded>
  </content-padded>
</template>

<script>

import TopNavBar from "@/components/TopNavBar.vue";
import ContentPadded from "@/components/ContentPaddedRouterView.vue";

export default {
  name: 'App',
  components: {ContentPadded, TopNavBar},
  async created() {
    await this.$store.dispatch('initializeDB');
  },
}
</script>


<style scoped>
@import "@/assets/css/app.css";
@import "bootstrap-icons";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,300&family=Roboto:wght@300;400;500;700&display=swap');

body * {
  font-family: 'Poppins', sans-serif;
}
</style>