export function createElement (type, props, ...children) {
  if (!props) props = {}
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

export function coerceToVNode (vnode) {
  if (vnode == null || typeof vnode === 'boolean') return null

	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return createVNode(null, null, vnode, null)
  }
  
	if (vnode._dom != null) {
		return createVNode(vnode.type, vnode.props, vnode.text, vnode.key)
	}

	return vnode
}