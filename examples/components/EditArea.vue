<template>
  <div class="edit-area" @dragover.prevent @drop="onDrop">
    <div
      v-for="component in components"
      :key="component.id"
      class="edit-item"
      :class="activeId === component.id ? 'active-item' : ''"
      @click="selectComponent(component.id)"
    >
      <img :src="component.preview" :alt="component.name" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    components: {
      type: Array,
      required: true
    },
    // selectedComponent: {
    //   type: Object,
    //   required: false,
    //   default: () => ([])
    // }
  },
  data() {
    return {
      activeId: ''
    }
  },
  methods: {
    onDrop(event) {
      const componentId = event.dataTransfer.getData('componentId');
      const draggedComponent = this.$parent.availableComponents.find(comp => comp.id === componentId);
      
      if (draggedComponent) {
        if(this.components.some(comp => comp.id === draggedComponent.id)) {
          alert('该组件已存在预览视图了');
          return;
        }
        this.$emit('update-components', [
          ...this.components,
          draggedComponent
        ]);
      }
    },
    selectComponent(id) {
      this.activeId = id;
      this.$emit('select-component', id);
    }
  }
}
</script>

<style scoped>
.edit-area {
  box-sizing: border-box;
  width: 375px;
  border-right: 2px solid #cfcece;
  border-left: 2px solid #cfcece;
  padding: 0 10px;
  min-height: 400px;
  position: relative;
}
.edit-item {
  cursor: pointer;

}
.edit-item.active-item {
    border-radius: 10px;
    margin-bottom: 5px;
    overflow: hidden;
    padding: 0 4px;
    transition: .4s;
    box-shadow: 0 2px 4px 4px rgba(120, 138, 189, .631372549), 0 2px 16px 4px rgba(97, 70, 233, .5450980392);

}
.edit-item img {
  width: 100%;
}
</style>
