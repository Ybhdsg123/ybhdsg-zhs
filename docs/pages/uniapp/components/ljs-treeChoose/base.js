
/**
 * 树数据集，获取选中的数据包括直系父的集合
 * 路由处使用
 * @param {Array} data 原始数据
 * @param {String} value 选中的数据唯一值
 * @param {String} key 选中的数据唯一值对应的key
 * @param {Array} parents 选中的数据包括直系父的集合
 * @returns {Array} 选中的数据包括直系父的集合
 * @example const parents = base.getTreeParents(data, value, key, []);
 */
export function getTreeParents(data, value, key, parents) {
  const nums = data.length;
  for (let i = 0; i < nums; i++) {
    if (data[i][key] === value) {
      parents.unshift(data[i]);
      return parents;
    }
    if (data[i].children !== undefined) {
      parents = getTreeParents(data[i].children, value, key, parents);
      if (parents.length > 0 && parents[parents.length - 1][key] === value) {
        parents.unshift(data[i]);
        return parents;
      }
    }
  }
  return parents;
}

/**
 * 树数据筛选
 * @param {Object} props 字段
 * @param {Array} tree 原始数据
 * @param {String} keywords 关键字
 * @returns {Array} 筛选后的数据
 * @example this.listData = treeFilter(this.listData, this.search.key);
 */
export function treeFilter(props, tree, keywords) {
  const result = [];
  if (tree === undefined || tree === null || tree === '') {
    return tree;
  }
  const nums = tree.length;
  for (let i = 0; i < nums; i++) {
    const item = tree[i];
    if (item[props.label].includes(keywords)) {
      result.push(item);
      continue;
    }
    if (item[props.children] !== undefined && item[props.children].length > 0) {
      item[props.children] = treeFilter(props, item[props.children], keywords);
      if (item[props.children].length > 0) {
        result.push(item);
      }
    }
  }
  return result;
}