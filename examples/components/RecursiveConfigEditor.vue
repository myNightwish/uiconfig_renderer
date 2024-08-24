<template>
  <div class="config-item">
    <div v-for="(value, key) in localConfig" :key="key" class="config-field">
      <label :for="key">{{ key }}:</label>
      <!-- 如果是对象类型，递归调用本组件 -->
      <div v-if="isObject(value)">
        <RecursiveConfigEditor :config="value" @update-config="updateChildConfig(key, $event)" />
      </div>
      <!-- 如果是字符串类型 -->
      <input 
        v-else-if="typeof value === 'string'" 
        :id="key" 
        v-model="localConfig[key]" 
        @input="updateParentConfig" 
      />
      <!-- 如果是数组类型 -->
      <div v-else-if="Array.isArray(value)" class="config-array">
        <div v-for="(item, index) in value" :key="index">
          <input 
            v-if="typeof item === 'string'" 
            v-model="localConfig[key][index]" 
            @input="updateParentConfig" 
          />
          <RecursiveConfigEditor 
            v-else-if="isObject(item)" 
            :config="item" 
            @update-config="updateArrayItem(key, index, $event)" 
          />
        </div>
      </div>
      <!-- 其他类型的处理 -->
      <!-- 可以根据需要扩展 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RecursiveConfigEditor",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localConfig: JSON.parse(JSON.stringify(this.config)) // 深拷贝 props 到 data
    };
  },
  watch: {
    config: {
      handler(newConfig) {
        this.localConfig = JSON.parse(JSON.stringify(newConfig)); // 当 config 变化时，同步更新 localConfig
      },
      deep: true
    }
  },
  methods: {
    isObject(value) {
      return value !== null && typeof value === 'object' && !Array.isArray(value);
    },
    updateParentConfig() {
      this.$emit('update-config', this.localConfig);
    },
    updateChildConfig(key, updatedConfig) {
      this.$set(this.localConfig, key, updatedConfig);
      this.updateParentConfig();
    },
    updateArrayItem(key, index, updatedConfig) {
      this.$set(this.localConfig[key], index, updatedConfig);
      this.updateParentConfig();
    }
  }
}
</script>

<style scoped>
.config-item {
  margin-bottom: 10px;
}

.config-field {
  margin-bottom: 5px;
}

.config-array {
  margin-left: 15px;
}
</style>
