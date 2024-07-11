export const formConfig = [
  {
    label: '操作通报',
    type: 'el-input',
    model: 'user',
    props: {
      placeholder: '本次上线的需求',
      size: "small"
    }
  },
  {
    label: '操作目标',
    type: 'el-select',
    model: 'userTarget',
    props: {
      placeholder: '上线模块，如：FeNetdiskBusiness_E2E'
    },
    defaultvalue: "FeNetdiskBusiness_E2E",
    options: [
      { label: 'FeNetdiskBusiness_E2E', value: "FeNetdiskBusiness_E2E" },
      { label: 'netdisknode', value: "netdisknode" }
    ]
  },
  {
    label: '前置条件',
    type: 'el-input',
    model: 'frontCondition',
    defaultvalue: '测试通过',
    props: {
      size: "small"
    }
  },
  {
    label: '操作影响',
    type: 'el-input',
    model: 'effectArea',
    props: {
      type: 'textarea',
      placeholder: '影响范围：页面、模块',
      autosize: true
    }
  },
  {
    label: '是否测试',
    type: 'el-select',
    model: 'hasTest',
    defaultvalue: true,
    options: [
      { label: '是', value: true },
      { label: '否', value: false }
    ],
    props: {
      size: "small"
    }
  },
  {
    label: '每个机房是否有灰度能力',
    type: 'el-input',
    model: 'hasGrayFlow',
    defaultvalue: '是',
    props: {
      size: "small"
    }
  },
  {
    label: '如何验证符合预期',
    type: 'el-input',
    model: 'matchExpect',
    props: {
      type: 'textarea',
      placeholder: '填写',
    }
  },
  {
    label: '止损方案',
    type: 'el-input',
    model: 'reduceLossWay',
    defaultvalue: '回滚',
    props: {
      size: "small"
    }
  },
  {
    label: '操作人',
    type: 'el-input',
    model: 'userOperator',
    props: {
      placeholder: '上线人姓名',
    }
  },
  {
    label: 'Review人',
    type: 'el-input',
    model: 'userReview',
    props: {
      placeholder: 'review人邮箱前缀',
    }
  },
  {
    label: '预估操作时间',
    type: 'el-input',
    model: 'operateTime',
    props: {
      size: "small"
    }
  },
  {
    label: '初始操作进度',
    type: 'el-input',
    model: 'startProgress',
    defaultvalue: '白名单',
    props: {
      size: "small"
    }
  },
  {
    label: '上线代码',
    type: 'el-input',
    model: 'codeDiffOnline',
    props: {
      type: 'textarea',
      placeholder: '上线代码版本diff'
    }
  },
  {
    label: '上线单链接',
    type: 'el-input',
    model: 'towerLink',
    props: {
      type: 'textarea',
      placeholder: '上线单链接'
    }
  },
  {
    label: '上线单截图',
    type: 'img-upload',
    model: 'towerCheckerPic',
    uploadBtn: '粘贴并预览'
  },
];