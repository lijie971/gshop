<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.show" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FooterGuide from "@/components/FooterGuide/FooterGuide.vue";
import HearderTop from "@/components/HearderTop/HearderTop.vue";

export default {
  name: "App",
  components: {
    FooterGuide,
    HearderTop,
  },
  methods: {
    ...mapActions(["getAddress", "getUserInfo"]),
  },
  mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress();
    this.getUserInfo();
  },
};
</script>

<style lang="stylus" scoped>
.app
  width 100%
  height 100%
  background #f5f5f5
</style>