import { diff } from './diff/diff'
import { assign } from './util'
export class Component {
  constructor (props) {
    if (!props) props = {} 
    this.props = props
    this.state = {}
  }

  setState (update, callback) {
    let s

    if (this._nextState && this._nextState !== this.state) {
      s = this._nextState
    } else {
      s = this._nextState = assign({}, this.state)
    }

    if (typeof update === 'function') {
      update = update(s, this.props)
      assign(s, update)
    } else {
      assign(s, update)
    }
    
    if (this._vnode) {
      if (callback) {
        this._renderCallbacks.push(callback)
      }
    }
  }

  forceUpdate () {
  }

  render () {
    return null
  }
}