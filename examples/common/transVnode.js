export default {
    name: 'transVnode',
    props: {
      name: {
        type: String,
        required: true
      },
      innerClass: {
        type: String,
        default: ''
      },
      config: {
        type: Object,
        default: () => ({})
      },
      children: {
        type: Array,
        default: () => []
      }
    },
    render(h) {
      const { innerClass, config, children, name } = this;
  
      // 函数：渲染子节点
      const renderChildren = () => {
        return children.map((child, index) => h('transVnode', {
          props: {
            name: child.name || `child-${index}`, // 确保传递 name prop
            innerClass: child.innerClass || '',
            config: child.config || {},
            children: child.children || []
          },
          key: child.name || `child-${index}` // 确保设置唯一 key
        }));
      };
  
      // 函数：渲染单个元素
      const renderElement = () => {
        const eventHandlers = config.on
          ? Object.keys(config.on).reduce((handlers, event) => {
              handlers[event] = (...args) => new Function(...config.on[event])(...args);
              return handlers;
            }, {})
          : {};
  
        return h(config.tag, {
          key: name,
          class: config.innerClass || innerClass, // 确保 class 包含 innerClass
          domProps: config.attributes,
          on: eventHandlers
        }, config.content);
      };
  
      return children.length > 0
        ? h('div', { class: innerClass, key: name }, renderChildren())
        : renderElement();
    }
  };
  