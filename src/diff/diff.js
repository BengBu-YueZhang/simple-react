import { diffChildren } from './diff-children'
import { diffProps } from './diff-props'

// It hasn't been implemented yet
export function diff (
  dom,
  root,
  newVNode,
  oldVNode,
  mounts,
  force
) {
  if (oldVNode == null || newVNode == null || newVNode.type !== oldVNode.type) {
    if (!newVNode) return null
    dom = null
    oldVNode = {}
  }

  let newType = newVNode.type

  if (typeof newType === 'function') {
    // render component
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
export function diffElementNodes (dom, newVNode, oldVNode, mounts) {

  if (!dom) {
    dom = newVNode.type === null ? document.createTextNode(newVNode.text) : document.createElement(newVNode.type)
  }

  newVNode._dom = dom

  if (newVNode.type) {
    if (newVNode !== oldVNode) {
      let newProps = newVNode.props
      let oldProps = newVNode.props
      if (!oldProps) {
        oldProps = {}
      }
      diffChildren(dom, newVNode, oldVNode, mounts)
      diffProps(dom, newProps, oldProps)
    }
  }

  return dom
}

export function runDidMount () {
}