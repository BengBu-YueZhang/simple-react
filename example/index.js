import { h, render, Component } from '../src'

class HelloWorld extends Component {

  constructor (props) {
    super(props)
    this.state = {
      msg1: 'msg1',
      msg2: 'msg2'
    }
  }

  componentWillMount () {
    this.setState({
      msg1: 'componentWillMount change'
    })
  }

  handleClick () {
    this.setState({
      msg2: 'handleClick'
    })
  }

  render () {
    return (
      <div>
        <h1 id="title" style="color: red">{ this.state.msg1 }</h1>
        <h1 id="title" style="color: blue">{ this.state.msg2 }</h1>
        <button onClick={this.handleClick.bind(this)}>点击</button>
      </div>
    )
  }
}

render(
  <HelloWorld/>,
  document.getElementById('app')
)
