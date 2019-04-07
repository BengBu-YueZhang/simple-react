import { diff, runDidMount } from './diff'
export class Component {
  constructor (props) {
    this.props = props
    this.state = {}
  }

  setState (update) {
    let s
    if (this.state !== this._nextState && this._nextState) {
      s = this._nextState
    } else {
      s = this._nextState = Object.assign({}, this.state)
    }

    if (update && typeof update === 'object') {
      s = Object.assign(s, update)
    } else {
      return
    }

    if (this._vnode) {
      enqueueRender(this)
    }
  }

  forceUpdate () {
    let vnode = this._vnode
    let dom = this._vnode._dom
    let parentDom = this._parentDom
    let mounts = []
    if (parentDom) {
      dom = diff(dom, parentDom, vnode, vnode, mounts)
      runDidMount(mounts)
    }
  }

  render () {
    return null
  }
}

let queue = []

function defer (fn) {
  return Promise.resolve().then(fn)
}

function process () {
  let p
  while ((p = queue.pop())) {
    if (p._dirty) {
      p.forceUpdate()
    }
  }
}

function enqueueRender (c) {
  if (!c._dirty) {
    c._dirty = true
    queue.push(c)
  }
  if (queue.length === 1) {
    defer(process)
  }
}
