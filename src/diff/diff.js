import { diffChildren } from './diff-children'
import { diffProps } from './diff-props'
import { coerceToVNode } from '../create-element'
import { assign } from '../util'
import { Component } from '../components'

// It hasn't been implemented yet
export function diff (
  dom,
  root,
  newVNode,
  oldVNode,
  mounts,
  force
) {

  let isNew = false
  let c, oldState, oldProps, p, snapshot

  if (oldVNode == null || newVNode == null || newVNode.type !== oldVNode.type) {
    if (!newVNode) return null
    dom = null
    oldVNode = {}
  }

  let newType = newVNode.type

  if (typeof newType === 'function') {

    if (oldVNode._component) {

    } else {
      isNew = true
      if (newType.prototype && newType.prototype.render) {
        newVNode._component = c = new newType(newVNode.props)
      } else {
        newVNode._component = c = new Component(newVNode.props)
        c.constructor = newType
        c.render = function (props) {
          return this.constructor(props)
        }
      }
      c.props = newVNode.props
      c._dirty = true
      c._renderCallbacks = []
    }

    c._vnode = newVNode
    
    let s = c._nextState || c.state

    if (newType.getDerivedStateFromProps) {
      oldState = assign({}, c.state)
      assign(s, newType.getDerivedStateFromProps(newType.props, s))
    }

    if (isNew) {
      if (c.componentWillMount) {
        c.componentWillMount()
        s = c._nextState || c.state
      }
      if (c.componentDidMount) {
        mounts.push(c)
      }
    } else {
      if (c.componentWillReceiveProps) {
      }
      if (c.shouldComponentUpdate) {
      }
    }

    oldProps = c.props

		if (!oldState) {
      oldState = c.state
    }
    c.props = newVNode.props
    c.state = s
    
    let prev = c._prevVNode
    let vnode = c._prevVNode = coerceToVNode(c.render(c.props, c.state))
    c._dirty = false

    if (!isNew && c.getSnapshotBeforeUpdate!=null) {
    }

    c.base = dom = diff(
      dom,
      root,
      vnode,
      prev,
      mounts
    )
  } else {
    dom = diffElementNodes(
      dom,
      newVNode,
      oldVNode,
      mounts
    )
  }

  newVNode._dom = dom

  if (c!=null) {
    while (p = c._renderCallbacks.pop()) {
      p.call(c)
    }

    if (!isNew && oldProps && c.componentDidUpdate) {
    }
  }

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
      let oldProps = oldVNode.props
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