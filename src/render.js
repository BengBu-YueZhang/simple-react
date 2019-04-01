import { runDidMount, diff } from './diff/diff'

export function render (vnode, root) {
  let oldVNode = root._prevVNode
  let newVNode = root._prevVNode = vnode
  let dom = oldVNode ? oldVNode._dom : null
  let mounts = []
  let newDom = diff(dom, root, newVNode, oldVNode, mounts)
  if (newDom) {
    root.appendChild(newDom)
  }
  runDidMount(mounts, vnode)
}
