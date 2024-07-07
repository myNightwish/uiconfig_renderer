<template>
  <div class="home_wrapper">
      <mi-skeleton id="skeleton" :loading="showSkeleton" animated  :row="8" :count="1" :throttle="500">
          <div class="content_area">welcome to My Vue.js UI By WebPack!</div>
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
          <mi-backtop target="#palyapp"></mi-backtop>
          <mi-progress :type="'circle'" :text-inside="false" :stroke-width="26" :percentage="70" :show-text="true"></mi-progress>
          <mi-divider content-position="left">少年包青天</mi-divider>
          <mi-divider><i class="mi-icon-mobile-phone"></i></mi-divider>
          <mi-divider content-position="right">阿里云</mi-divider>
          <mi-row :tag="'span'">
            <mi-col :span="24"><div class="grid-content bg-purple-dark"></div></mi-col>
          </mi-row>
          <mi-row :gutter="24">
            <mi-col :span="12"><div class="grid-content bg-purple"></div></mi-col>
            <mi-col :span="12"><div class="grid-content bg-purple-light"></div></mi-col>
          </mi-row>
          <mi-row>
            <mi-col :span="8"><div class="grid-content bg-purple">1234</div></mi-col>
            <mi-col :span="8"><div class="grid-content bg-purple-light">45465</div></mi-col>
            <mi-col :span="8"><div class="grid-content bg-purple">42432</div></mi-col>
          </mi-row>
          <mi-row :gutter="10">
              <mi-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple">33</div></mi-col>
              <mi-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light">44</div></mi-col>
              <mi-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">55</div></mi-col>
              <mi-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light">66</div></mi-col>
          </mi-row>
          <mi-button @click="showLoading = !showLoading">
            Toggle Loading
          </mi-button>
          <div v-loading="showLoading" style="margin-top: 20px; width: 300px; height: 200px; border: 1px solid #ccc;">
            Content here
        </div>
  </mi-skeleton>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tagConf: {
        text: 'hello',
        type: 'success',
        size: 'large',
        closable: true,
        effect: 'plain'
      },
      showLoading: true,
      showSkeleton: true
    }
  },
  watch: {
      showLoading(val) {
        console.log(`Loading state changed: ${val}`);
      }
  },
  mounted() {
    setTimeout(() => {
      this.showSkeleton = false
    }, 1000)
  },
  methods: {
    handleClick() {
      this.tagConf.text='changed-hello'
    }
  }
}
</script>
<style lang="scss">
  .home_wrapper {
    height: 180vh;
  }
  .mi-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .mi-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .mi-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>