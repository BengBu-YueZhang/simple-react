/**
 * 创建VNode
 * @param {Function|String} type vnode节点的类型
 * @param {Object} props
 * @param {}
 */
export function createElement (
  type,
  props = {},
  text = null,
  key = null,
  ...children
) {

  if (children && children.length) props.children = children

  let vnode = {
    type,
    props,
    text,
    key,
    _children: null,
    _dom: null,
    _component: null
  }

  return vnode
}

// export function anyToVNode (node) {
//   if (!node || typeof node === 'boolean') {
//     return null
//   } else if (typeof node === 'string' || typeof node === 'number') {
//     return createElement(null, null, node, null, null)
//   } else if (Array.isArray(node)) {
//     return createElement()
//   } else if (node._dom) {

//   }
// }
