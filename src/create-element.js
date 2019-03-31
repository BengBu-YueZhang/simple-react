export function createElement (type, props = {}, ...children) {
  props.children = [...children]

  let key = props.key

	if (key) {
    delete props.key
  }

  return createVNode(type, props, null, key)
}

export function createVNode (type, props, text, key) {
  const VNode = {
    type,
    props,
    text,
    key,
    _dom: null,
    _children: null,
    _component: null
  }

  return VNode
}