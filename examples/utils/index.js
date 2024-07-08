/**
 * @description 对vDom对象以及其子节点动态插值
 * @param {Object} vDom 根节点
 * @param {Object} combinedData 对枚举enuTagType中的下标为vDom.name的被赋值
 * @returns 与传入的vDom类型一致
 */
export function travelVirtual(vDom, combinedData) {
  const enuTagType = {
    img: ['src'],
    div: ['content'],
    a: ['href', 'text', 'content'],
    span: ['content']
  };

  // 获取当前标签的属性列表
  const attrList = enuTagType[vDom.config?.tag] || [];

  // 构造 attributes 对象
  const attributes = attrList.reduce((attrs, attr) => {
    attrs[attr] = vDom.config[attr] || combinedData?.[vDom.name];
    return attrs;
  }, {});

  // 更新 config 对象
  const config = {
    ...(vDom.config || {}),
    attributes,
    content: attrList.includes('content') ? vDom.config?.content || combinedData[vDom.name] : ''
  };

  // 递归处理子节点
  const children = vDom.children?.map(child => travelVirtual(child, combinedData)) || [];

  return {
    ...vDom,
    config,
    children
  };
}
