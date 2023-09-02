<script>
import ArticleLists from "@/components/ArticleLists.vue";

export default {
  name: "HomePage",
  components: {ArticleLists}
}

</script>

<template>
  <ArticleLists></ArticleLists>
</template>

<style scoped>
@import "@/assets/css/app.css";
@import "bootstrap-icons";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,300&family=Roboto:wght@300;400;500;700&display=swap');

body * {
  font-family: 'Poppins', sans-serif;
}
</style>