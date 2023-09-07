<template>
  <left-nav-bar :set-current-active-left-nav="setCurrentActiveLeftNav" :current-active-left-nav="currentActiveLeftNav"></left-nav-bar>
  <content-padded v-if="isDBLoaded">
  </content-padded>
  <overlay-box v-if="isSomethingUnderProcess" :lists="listOfProcess"></overlay-box>
</template>

<script>

import ContentPadded from "@/components/ContentPaddedRouterView.vue";
import OverlayBox from "@/components/OverlayBox.vue";
import LeftNavBar from "@/components/LeftNavBar.vue";

export default {
  name: 'App',
  data() {
    return {
      currentActiveLeftNav: 'home'
    }
  },
  methods: {
    setCurrentActiveLeftNav(name) {
      this.currentActiveLeftNav = name;
    }
  },
  computed: {
    isDBLoaded() {
      return this.$store.state.isDBLoaded;
    },
    isSomethingUnderProcess() {
      return this.$store.state.processingList.length > 0;
    },
    listOfProcess() {
      return this.$store.state.processingList;
    }
  },
  components: {LeftNavBar, OverlayBox, ContentPadded},
  async created() {
    await this.$store.dispatch('initializeDB');
  },
}
</script>


<style scoped>

</style>