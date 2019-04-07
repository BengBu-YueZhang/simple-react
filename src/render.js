import { diff, runDidMount } from './diff'

export function render (vnode, parentDom) {
  let oldVNode = parentDom._prevVNode
  let newVNode = parentDom._prevVNode = vnode
  let dom = oldVNode ? oldVNode._dom : null
  let mounts = []
  let newDom = diff(dom, parentDom, newVNode, oldVNode, mounts)
  if (newDom) {
    parentDom.appendChild(newDom)
  }
  runDidMount(mounts)
}