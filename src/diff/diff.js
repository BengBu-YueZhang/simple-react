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

export function diffElementNodes (dom, newVNode, oldVNode) {
}

export function runDidMount () {
}