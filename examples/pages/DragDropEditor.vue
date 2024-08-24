<template>
  <div>
    <div class="drag-drop-editor">
      <MaterialArea
        :components="availableComponents"
        @dragStart="onDragStart"
      />
      <EditArea
        :components="components"
        :selected-component="selectedComponent"
        @update-components="updateComponents"
        @select-component="selectComponent"
      />
      <ConfigArea
        v-if="selectedComponent"
        :selected-component="selectedComponent"
        @save-config="saveConfig"
      />
      <div v-if="selectedComponent" class="preview-area">
        welcome to UIconfig_renderer!
        <iframe  ref="previewFrame" :src="previewSrc" class="preview-frame"></iframe>
      </div>
    </div>
    <button class="save-btn" @click="saveAll">保存所有配置</button>
  </div>
</template>

<script>
import MaterialArea from '../components/MaterialArea.vue';
import EditArea from '../components/EditArea.vue';
import ConfigArea from '../components/ConfigArea.vue';

export default {
  components: {
    MaterialArea,
    EditArea,
    ConfigArea
  },
  data() {
    return {
      previewSrc: "http://nn.pan.baidu.com:8091/#/home",
      availableComponents: [
        {
          name: 'UserCard',
          id: 'bus-user-card',
          chineseName: "头部组件",
          preview: 'https://staticsns.cdn.bcebos.com/amis/2021-11/1635753996887/WeChat1c1c9618c9eb0b2b3fc82c582a8f610c.png',
          config: {
            name: 'user-card',
            innerClass: 'user-card-class',
            children: [
              {
                name: 'avatar',
                config: {
                  innerClass: 'user-avatar',
                  tag: 'img'
                }
              },
              {
                name: 'username',
                config: {
                  innerClass: 'user-name',
                  tag: 'div',
                  on: {
                    click: ['console.log("User clicked username")']
                  }
                }
              }
            ]
          }
        },
        {
          name: 'ProductTab',
          chineseName: "tab组件",
          id: 'bus-product-tab',
          preview: 'https://staticsns.cdn.bcebos.com/amis/2021-11/1635754267410/WeChat1c1c9618c9eb0b2b3fc82c582a8f610c.png',
          config: {
            name: 'product-tab',
            innerClass: 'product-tab-class',
            children: [
              {
                name: 'avatar',
                config: {
                  innerClass: 'user-avatar',
                  tag: 'img'
                }
              },
              {
                name: 'username',
                config: {
                  innerClass: 'user-name',
                  tag: 'div',
                  on: {
                    click: ['console.log("User clicked username")']
                  }
                }
              }
            ]
          }
        },
        {
          name: 'ProductCard',
          id: 'bus-product-card',
          chineseName: "商品组件",
          preview: 'https://staticsns.cdn.bcebos.com/amis/2023-6/1686206086027/product-list.png',
          config: {
            name: 'product-card',
            innerClass: 'product-card-class',
            children: [
              {
                name: 'image',
                config: {
                  innerClass: 'product-image',
                  tag: 'img'
                }
              },
              {
                name: 'title',
                config: {
                  innerClass: 'product-title',
                  tag: 'h2',
                  content: 'Product Title'
                }
              },
              {
                name: 'price',
                config: {
                  innerClass: 'product-price',
                  tag: 'p',
                  content: '$0.00'
                }
              }
            ]
          }
        }
        // 添加更多组件配置
      ],
      components: [],
      selectedComponent: null,
      componentConfigMap: {}
    };
  },
  methods: {
    refreshPreview() {
      // 刷新预览区
      // const previewFrame = this.$refs.previewFrame;
      // this.previewFrame.src = previewFrame.src;
      this.$refs.previewFrame.contentWindow.location.reload();
    },
    onDragStart(component, event) {
      event.dataTransfer.setData('componentId', component.id);
    },
    updateComponents(components) {
      this.components = components;
    },
    selectComponent(id) {
      this.selectedComponent = this.components.find(comp => comp.id === id);
    },
    saveConfig(updatedComponent) {
      const { id } = updatedComponent;
      if (id) {
        // 将配置存入大对象
        this.componentConfigMap[id] = updatedComponent;
      }
      const index = this.components.findIndex(comp => comp.id === this.selectedComponent.id);
      if (index !== -1) {
        this.components.splice(index, 1, updatedComponent);
        this.selectedComponent = updatedComponent;
      }
    },
    saveAll() {
      console.log('最终的配置:', this.componentConfigMap);
      const finalConfig = JSON.stringify(this.components);
      console.log(finalConfig);
      // 这里可以调用API上传配置
    }
  }
}
</script>

<style scoped>
.drag-drop-editor {
  display: flex;
  flex-direction: row;
  padding: 60px 20px 0;
  background-color: #f4f5f5;
  background-image: linear-gradient(120deg, rgba(224, 195, 252, .3882352941), rgba(142, 197, 252, .4235294118))
}
.save-btn {
  width: 100px;
  height: 40px;
  align-self: self-end;
}
.preview-area {
  border-left: 2px solid #cfcece;
  height: 100vh;
  .preview-frame {
    height: 100%;
    border: none;
  }
}
</style>
