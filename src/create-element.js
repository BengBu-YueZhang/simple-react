export function h (type, props, ...children) {
  if (!props) {
    props = {}
  }

  if (children) {
    props.children = [...children]
  }

  return createVNode(type, props, null)
}

export function createVNode (type, props, text) {
  return {
    type,
    props,
    text,
    _children: null,
    _dom: null,
    _component: null
  }
}

export function anyToVNode (vnode) {
  if (vnode == null || typeof vnode === 'boolean') {
    return null
  }
  if (typeof vnode === 'string' || typeof vnode === 'number') {
		return createVNode(null, null, vnode)
  }
  return vnode
}
