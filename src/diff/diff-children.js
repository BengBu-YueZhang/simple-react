import { diff } from './diff'

// It hasn't been implemented yet
export function diffChildren (
  root,
  newParentVNode,
  oldParentVNode,
  mounts
) {
  let oldVNode, newVNode, newDom, i, j, index, p, oldChildrenLength

  let newChildren = newParentVNode._children || 
                    toChildVNodeArray(newParentVNode.props.children, newParentVNode._children = [])

  let oldChildren = oldParentVNode && oldParentVNode._children || []

  // oldChildrenLength = oldChildren.length

  for (i = 0; i < newChildren.length; i++) {
    newVNode = newChildren[i]
    oldVNode = index = null

    // // Todo: reuse dom
    // p = oldChildren[i]
    // if (
    //   p != null &&
    //   (
    //     newVNode.key == null && p.key == null && newVNode.type === oldVNode.type ||
    //     newVNode.key === p.key
    //   )
    // ) {
    //   index = i
    // } else {
    //   for (j = 0; j < oldChildrenLength; j++) {
    //     p = oldChildren[j]
    //     if (p) {
    //       if (
    //         newVNode.key == null && p.key == null && newVNode.type === oldVNode.type ||
    //         newVNode.key === p.key
    //       ) {
    //         index = j
    //         break
    //       }
    //     }
    //   }
    // }


    newDom = diff(
      oldVNode ? oldVNode._dom : null,
      root,
      newVNode,
      oldVNode,
      mounts,
      null
    )

    if (newVNode && newDom) {
      root.appendChild(newDom)
    }
  }
}

export function toChildVNodeArray (children, flat = []) {
  if (children == null || typeof children === 'boolean') {
    /** 不做任何处理 */
  } else if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      toChildVNodeArray(children[i], flat)
    }
  } else {
    flat.push(children)
  }
  return flat
}