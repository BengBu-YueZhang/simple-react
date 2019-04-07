import { anyToVNode } from './create-element'
import { Component } from './component'

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
  
  let c, isNew = false, newType = newVNode.type, oldProps, oldState

  if (typeof newType === 'function') {
    if (oldVNode._component) {
      c = newVNode._component = oldVNode._component
    } else {
      if (newType.prototype && newType.prototype.render) {
        newVNode._component = c = new newType(newVNode.props)
      }
      else {
        newVNode._component = c = new Component(newVNode.props)
        c.constructor = newType
        c.render = doRender
      }
    }

    c.props = newVNode.props
    isNew = c._dirty = true

    c._vnode = newVNode;

    let s = c._nextState || c.state;

    if (isNew) {
      if (c.componentWillMount != null) {
        c.componentWillMount()
        s = c._nextState || c.state
      }
      if (c.componentDidMount != null) {
        mounts.push(c)
      }
    }
    else {
      if (c.componentWillReceiveProps != null) {
        c.componentWillReceiveProps(newVNode.props)
        s = c._nextState || c.state
      }

      if (c.componentWillUpdate != null) {
        c.componentWillUpdate(newVNode.props, s);
      }
    }

    oldProps = c.props;
		if (!oldState) oldState = c.state;

    c.props = newVNode.props
    c.state = s

    let prev = c._prevVNode;
    let vnode = c._prevVNode = anyToVNode(c.render(c.props, c.state, c.context))
    c._dirty = false

    c.base = dom = diff(dom, parentDom, vnode, prev, mounts)

    c._parentDom = parentDom

  } else {
    dom = diffElement(dom, newVNode, oldVNode, mounts)
  }

  if (c!=null) {
    if (!isNew && oldProps!=null && c.componentDidUpdate!=null) {
      c.componentDidUpdate(oldProps, oldState)
    }
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

export function unmount (vnode, skipRemove) {
  let r

  let dom
  
	if (!skipRemove) {
		skipRemove = (dom = vnode._dom)!=null
	}

	vnode._dom = null

	if ((r = vnode._component)!=null) {
		if (r.componentWillUnmount) {
			r.componentWillUnmount()
		}

		r.base = r._parentDom = null;
		if (r = r._prevVNode) unmount(r, skipRemove)
	} else if (r = vnode._children) {
		for (let i = 0; i < r.length; i++) {
			unmount(r[i], skipRemove)
		}
	}

	if (dom!=null) removeNode(dom)
}


function removeNode(node) {
	let parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

function doRender(props, state, context) {
	return this.constructor(props, context)
}