import { h, render, Component } from '../src'

class HelloWorld extends Component {
  render () {
    return (
      <div>
        <h1 id="title" style="color: red">hello world</h1>
        <h1 id="title" style="color: blue">hello world</h1>
      </div>
    )
  }
}

render(
  <HelloWorld/>,
  document.getElementById('app')
)
