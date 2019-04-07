import { anyToVNode } from './create-element'

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

  return dom
}

export function diffProps (dom, newProps, oldProps) {
  for (let k in newProps) {
    if (
      k !== 'children' &&
      k !== 'key' &&
      oldProps[k] !== newProps[k]
    ) {
      setProperty(dom, k, newProps[k], oldProps[k])
    }
  }
  for (let k in oldProps) {
    if (
      k !== 'children' &&
      k !== 'key' &&
      (!newProps || !(k in newProps)) 
    ) {
      setProperty(dom, k, null, oldProps[k])
    }
  }
}

export function setProperty (dom, key, value, oldValue) {
  if (key === 'style') {
    let s = dom.style
    s.cssText = value
  } else if (key[0]==='o' && key[1]==='n') {
    let eventName = key.toLowerCase()
    eventName = eventName.substring(2)
    if (value) {
      if (!oldValue) {
        dom.addEventListener(eventName, value)
      }
    } else {
      dom.removeEventListener(eventName, value)
    }
  } else if (!value) {
    dom.removeAttribute(key)
  } else if (typeof value !== 'function') {
    dom.setAttribute(key, value)
  }
}

export function diffChildren (parentDom, newParentVNode, oldParentVNode, mounts) {
  let childDom, i, oldVNode, index, p, j, childVNode, nextDom, newDom

  let newChildren = newParentVNode._children || toChildArray(newParentVNode.props.children, newParentVNode._children = [])
  let oldChildren = oldParentVNode && oldParentVNode._children ? oldParentVNode._children : []
  let oldChildrenLength = oldChildren.length

  childDom = oldChildrenLength ? oldChildren[0] && oldChildren[0]._dom : null

  for (i = 0; i < newChildren.length; i++) {
    childVNode = newChildren[i] = anyToVNode(newChildren[i])
    oldVNode = index = null
    p = oldChildren[i]
    if (p != null && (childVNode.key==null && p.key==null ? (childVNode.type === p.type) : (childVNode.key === p.key))) {
			index = i
		} else {
			for (j=0; j < oldChildrenLength; j++) {
				p = oldChildren[j]
				if (p!=null) {
					if (childVNode.key==null && p.key==null ? (childVNode.type === p.type) : (childVNode.key === p.key)) {
						index = j
						break
					}
				}
			}
    }
    
    if (index != null) {
			oldVNode = oldChildren[index];
			oldChildren[index] = null
    }
    
    nextDom = childDom!=null && childDom.nextSibling

    newDom = diff(
      oldVNode==null ? null : oldVNode._dom,
      parentDom,
      childVNode,
      oldVNode,
      mounts
    )

    if (childVNode != null && newDom != null) {
      if (newDom !== childDom || newDom.parentNode == null) {
        outer: if (childDom == null) {
          parentDom.appendChild(newDom)
        } else {
          sibDom = childDom
          j = 0
					while ((sibDom=sibDom.nextSibling) && j++<oldChildrenLength/2) {
						if (sibDom===newDom) {
							break outer
						}
					}
					parentDom.insertBefore(newDom, childDom)
        }
      }
    }

    childDom = newDom!=null ? newDom.nextSibling : nextDom
  }

  for (i = oldChildrenLength; i--; ) {
    if (oldChildren[i] != null) {
      unmount(oldChildren[i])
    }
  }
}

export function toChildArray (children, flat) {
  if (children == null || typeof children === 'boolean') {
    /** 不做任何处理 */
  } else if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      toChildArray(children[i], flat)
    }
  } else {
    flat.push(anyToVNode(children))
  }
  return flat
}

export function runDidMount (mounts) {
  let c
  while ((c = mounts.pop())) {
    c.componentDidMount()
  }
}

export function unmount () {
}
