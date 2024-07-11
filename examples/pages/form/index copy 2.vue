<template>
  <div class="form-page">
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
                    <template v-if="item.type === 'img-upload'">
                        <img v-if="imageUrl" :src="imageUrl" class="image-preview" />
                        <el-button type="success" :disabled="!pastedFile" @click="handlePasteImage(item.model)">{{item.uploadBtn}}</el-button>
                    </template>
                </component>
            </el-form-item>
        </div>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">一键生成</el-button>
        </el-form-item>
    </el-form>
    <!-- Dialog 用于展示生成的配置 -->
    <el-dialog
      title="生成的配置"
      :visible.sync="dialogVisible"
      width="80%"
      @close="dialogVisible = false"
    >
        <div v-html="dialogContent"></div>
    </el-dialog>
    </div>
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
      dialogVisible: false,  // 控制 dialog 的显示
      dialogContent: ''    // 存储生成的 Markdown 配置内容
    };
  },
  created() {
    this.fetchConfig();
    this.setDefaultOperateTime();
  },
  mounted() {
    window.addEventListener('paste', this.handlePaste);
  },
  beforeDestroy() {
    window.removeEventListener('paste', this.handlePaste);
  },
  methods: {
    setDefaultOperateTime() {
      const today = new Date().toLocaleString().slice(0, 15);
      this.$set(this.formInline, 'operateTime', today);
    },
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
          this.generateConfig(); // 生成配置并显示在 dialog 中
        })
        .catch(() => {
          this.$message.error('提交表单时出错');
        });
    },
    generateConfig() {
        // 生成配置文件内容
        let content = '';
        this.formConfig.forEach(item => {
          content += item.type === 'img-upload' ? `<div>【${item.label}】:<img src="${this.imageUrl}" class="image-preview" />`
          :`<div>【${item.label}】: ${this.formInline[item.model]}</div>`;
        });
        content += `<div>辛苦check～</div>`;
        this.dialogContent = content;  // 存储生成的内容
        this.dialogVisible = true;     // 显示 dialog
    },
    fetchConfig() {
      // 模拟从后台拉取配置
      this.formConfig = formConfig;
      // 初始化formInline
      this.formInline = formConfig.reduce((acc, item) => {
         acc[item.model] =  item.defaultvalue ? item.defaultvalue : '';
        return acc;
      }, {});
    },
    handlePaste(event) {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          this.pastedFile[item.model] = item.getAsFile();
          this.readImg(this.pastedFile[item.model]);
        }
      }
    },
    handlePasteImage(model) {
      this.readImg(this.pastedFile[model]);
    },
    readImg(pastedFile){
      if (!pastedFile) {
        this.$message.error('未检测到粘贴的图片');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(pastedFile);
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
::v-deep .el-dialog__body {
  padding: 0 !important;
}
</style>
