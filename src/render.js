import { diff, runDidMount } from './diff'

export function render (vnode, parentDom) {
  let oldVNode = root._prevVNode
  let newVNode = root._prevVNode = vnode
  let dom = oldVNode ? oldVNode._dom : null
  let mounts = []
  let newDom = diff(dom, parentDom, newVNode, oldVNode, mounts)
  if (newDom) {
    root.appendChild(newDom)
  }
  runDidMount(mounts)
}