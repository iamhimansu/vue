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

<style>
@import "@/assets/css/app.css";
body * {
  font-family: 'Poppins', sans-serif;
}
</style>