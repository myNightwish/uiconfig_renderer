<template>
  <div class="material-area">
    <div
      v-for="component in components"
      :key="component.id"
      class="component-preview"
      :draggable="true"
    >
      <img :src="component.preview" :alt="component.name" @dragstart="onDragStart(component, $event)"/>
      <div class="name">{{ component.chineseName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    components: {
      type: Array,
      required: true
    }
  },
  methods: {
    onDragStart(component, event) {
      event.dataTransfer.setData('componentId', component.id);
    }
  }
}
</script>

<style scoped>
.material-area {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 280px;
  padding-right: 10px;
}
.component-preview {
  box-sizing: border-box;
  width: 120px;
  height: 90px;
  padding: 10px 0 30px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: rgba(141, 149, 166, 0.1);
}
.component-preview img {
  width: 100%;
}
.name {
  font-size: 12px;
  text-align: center;
}
</style>
