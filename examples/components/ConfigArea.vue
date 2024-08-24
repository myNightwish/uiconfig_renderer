<template>
  <div v-if="localConfig" class="config-area">
    <h3>编辑配置: {{ localConfig.name }}</h3>
    <RecursiveConfigEditor :config="localConfig.config" @update-config="updateConfig" />
    <button @click="saveConfig">保存配置</button>
    <button @click="resetConfig">重置</button>
  </div>
</template>

<script>
import RecursiveConfigEditor from './RecursiveConfigEditor.vue';

export default {
  components: {
    RecursiveConfigEditor
  },
  props: {
    selectedComponent: {
      type: Object,
      required: false,

      default: () => ({})
    }
  },
  data() {
    return {
      localConfig: this.selectedComponent
        ? { ...this.selectedComponent }
        : null,
    }
  },
  computed: {
    originalConfig() { 
      return this.selectedComponent
        ? JSON.parse(JSON.stringify(this.selectedComponent))
        : null
    }
  },
  watch: {
    selectedComponent: {
      handler(newVal) {
      if (newVal) {
        this.localConfig = { ...newVal };
      } else {
        this.localConfig = null;
      }
    },
    deep: true
  }
  },
  methods: {
    updateConfig(updatedConfig) {
      console.log('aaa111', updatedConfig)
      this.localConfig.config = updatedConfig;
    },
    saveConfig() {
      console.log('save---', this.localConfig)

      this.$emit('save-config', this.localConfig);
    },
    resetConfig() {
      this.localConfig = JSON.parse(JSON.stringify(this.originalConfig));
    },
  }
}
</script>

<style scoped>
.config-area {
  box-sizing: border-box;
  width: 300px;
  padding: 10px;
}
</style>
