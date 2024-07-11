<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <div v-for="(item, index) in formConfig" :key="index">
      <el-form-item :label="item.label">
        <component 
          :is="item.type"
          v-model="formInline[item.model]" 
          v-bind="item.props"
        >
          <el-option 
            v-for="option in item.options" 
            :key="option.value" 
            :label="option.label" 
            :value="option.value"
          ></el-option>
        </component>
      </el-form-item>
    </div>
    <el-form-item label="上传上线单截图">
      <img v-if="imageUrl" :src="imageUrl" class="image-preview" />
      <el-button type="success" :disabled="!pastedFile" @click="handlePasteImage">粘贴并预览</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">一键生成</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { formConfig } from './formConfig.js';
export default {
  data() {
    return {
      formInline: {},
      formConfig: [],
      pastedFile: null,
      imageUrl: '',
    };
  },
  created() {
    this.fetchConfig();
  },
  mounted() {
    window.addEventListener('paste', this.handlePaste);
    console.log("window.ClipboardItem--", window.ClipboardItem, navigator.clipboard)
  },
  beforeDestroy() {
    window.removeEventListener('paste', this.handlePaste);
  },
  methods: {
    onSubmit() {
      const formData = new FormData();
      for (const key in this.formInline) {
        formData.append(key, this.formInline[key]);
      }
      if (this.pastedFile) {
        formData.append('image', this.pastedFile);
      }
      fetch('http://localhost:3000/submit', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(_ => {
          this.$message.success('表单提交成功');
          this.generateConfig();
        })
        .catch(() => {
          this.$message.error('提交表单时出错');
        });
    },
    generateConfig() {
      
    },
    // 暂时不使用
    // copyImageToClipboard() {
    //   const blob = this.pastedFile;
    //   console.log("navigator---", navigator)
    //   if (window.ClipboardItem) {
    //         const clipboardItem = new ClipboardItem({ 
    //           [blob.type]: blob });
    //         navigator.clipboard.write([clipboardItem])
    //           .then(() => 
    //             this.$message.success('图片已成功复制到剪贴板')
    //           ).catch(e =>  {
    //               this.$message.error('复制错误')
    //               console.error('写入图片数据到剪贴板错误', e)
    //           }
    //         );
    //   } else {
    //     console.warn('ClipboardItem API 不被支持');
    //   }
    // },
    fetchConfig() {
      // 模拟从后台拉取配置
      this.formConfig = formConfig;
      // 初始化formInline
      this.formInline = formConfig.reduce((acc, item) => {
        acc[item.model] = '';
        return acc;
      }, {});
    },
    handlePaste(event) {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          this.pastedFile = item.getAsFile();
          console.log('粘贴的图片文件已获取', this.pastedFile);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrl = e.target.result;
          };
          reader.readAsDataURL(this.pastedFile);
        }
      }
    },
    handlePasteImage() {
      if (this.pastedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(this.pastedFile);
      } else {
        this.$message.error('未检测到粘贴的图片');
      }
    }
  }
};
</script>

<style>
.demo-form-inline {
  margin: 20px;
}
.image-preview {
  max-width: 100px;
  max-height: 100px;
  display: block;
  margin-top: 10px;
}
</style>
