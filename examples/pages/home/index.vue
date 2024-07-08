<template>
    <mi-skeleton id="skeleton" class="home_wrapper" :loading="showSkeleton" animated  :row="8" :count="1" :throttle="500">
        <template slot="template">
            <mi-skeleton-item variant="text" style="margin-right: 16px;" />
            <mi-skeleton-item
              variant="image"
              style="width: 90px; height: 90px;"
            />
            <mi-skeleton-item variant="p" style="width: 100%;height: 30px; margin-top: 26px;" />
            <mi-skeleton-item variant="p" style="width: 100%;height: 30px; margin-top: 16px;" />
            <mi-skeleton-item variant="p" style="width: 100%;height: 30px; margin-top: 16px;" />
            <div style="padding: 14px; height: 60px;">
                <mi-skeleton-item variant="h3" style="width: 50%;" />
                <div
                  style="display: flex; align-items: center; justify-items: space-between; margin-top: 16px; height: 16px;"
                >
                  <mi-skeleton-item variant="text" style="width: 30%;" />
                </div>
            </div>
        </template>
        <mi-backtop target=".home_wrapper"></mi-backtop>
        <div class="content_area">welcome to UIconfig_renderer!</div>
        <Mi-user-card
            v-if="compSwitch.userCard"
            :card-config="baseConf.userCard"
            :inner-data-conf="baseConf.userCard || {}"
        ></Mi-user-card>
        <mi-progress :type="'circle'" :text-inside="false" :stroke-width="26" :percentage="70" :show-text="true"></mi-progress>
    </mi-skeleton>
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