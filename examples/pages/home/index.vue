<template>
  <div class="content_area">
    <Mi-user-card
        v-if="compSwitch.userCard"
        :card-config="baseConf.userCard"
        :inner-data-conf="baseConf.userCard || {}"
    ></Mi-user-card>
  </div>
</template>

<script>
import MiUserCard from 'Components/MiUserCard.vue';

export default {
  name: 'Home',
  components: {
    MiUserCard
  },
  props: {
      baseConf: {
          type: Object,
          default: () => {}
      },
      foramteListFunc: {
          type: Function,
          default: () => {}
      },
      compSwitch: {
          type: Object,
          default: () => {}
      }
  },
  data() {
    return {
      tagConf: {
        text: 'hello',
        type: 'success',
        size: 'large',
        closable: true,
        effect: 'plain'
      },
      showSkeleton: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.showSkeleton = false
    }, 1000)
  }
}
</script>
<style lang="scss">
.home_wrapper {
    height: 180vh;

    .content_area {
        font-weight: 600;
        font-size: 20px;
    }
}
</style>