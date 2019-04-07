export function diff (dom, parentDom, newVNode, oldVNode, mounts) {
  if (oldVNode==null || newVNode==null || oldVNode.type!==newVNode.type) {
		if (oldVNode!=null) {
      unmount(oldVNode, ancestorComponent)
    }
		if (newVNode==null) {
      return null
    }
		dom = null
		oldVNode = {}
  }
  
  let c, p, oldProps, oldState, isNew = false, newType = newVNode.type

  if (typeof newType === 'function') {

  } else {
    dom = diffElement(dom, newVNode, oldVNode, mounts)
  }

  newVNode._dom = dom

  return dom
}

export function diffElement (dom, newVNode, oldVNode, mounts) {

  let d = dom

  if (!dom) {
    dom = newVNode.type === null ? document.createTextNode(newVNode.text) : document.createElement(newVNode.type)
  }

  newVNode._dom = dom

  if (!newVNode.type) {
    // 更新文本
    if ((d === null || dom === d) && newVNode.text !== oldVNode.text) {
      dom.data = newVNode.text
    }
  } else {
    if (newVNode !== oldVNode) {
      let oldProps = oldVNode.props
      let newProps = newVNode.props

      if (!oldProps) {
        oldProps = {}
      }
      diffChildren(dom, newVNode, oldVNode, mounts)
      diffProps(dom, newProps, oldProps)
    }
  }
}

export function diffProps (dom, newProps, oldProps) {
}

export function diffChildren (parentDom, newParentVNode, oldParentVNode, mounts) {
}

export function setProperty (dom, key, value, oldValue) {
}

export function runDidMount (mounts) {
}

export function unmount () {
}
