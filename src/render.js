import { diffChildren } from './diff/diff-children'
import { runDidMount } from './diff/diff'

export function render (vnode, root) {
  let oldVNode = root._prevVNode
  let newVNode = root._prevVNode = vnode
  let dom = oldVNode ? oldVNode._dom : null
  let mounts = []
  diff(dom, root, newVNode, oldVNode, mounts)
  runDidMount(mounts, vnode)
}
