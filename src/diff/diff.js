// It hasn't been implemented yet
export function diff (
  dom,
  root,
  newVNode,
  oldVNode,
  mounts,
  force
) {
  // 删除整个子树
  if (oldVNode == null || newVNode == null || newVNode.type !== oldVNode.type) {
    if (!newVNode) return null
    dom = null
    oldVNode = {}
  }

  let newType = newVNode.type

  if (typeof newType === 'function') {
    // ... Component
  } else {
    dom = diffElementNodes(
      dom,
      newVNode,
      oldVNode,
      mounts
    )
  }

  newVNode._dom = dom

  return dom
}

// It hasn't been implemented yet
export function diffElementNodes (dom, newVNode, oldVNode) {
  let d = dom

  if (!dom) {
    dom = newVNode.type === null ? document.createTextNode(newVNode.text) : document.createElement(newVNode.type)
  }

  newVNode._dom = dom

  if (newVNode.type) {
  } else {
    if (newVNode !== oldVNode) {
    }
  }
}

export function runDidMount () {
}