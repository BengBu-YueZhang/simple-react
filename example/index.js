import { h, render, Component } from '../src'

class HelloWorld extends Component {
  render () {
    return (
      <h1 id="title" style="color: blue">hello world</h1>
    )
  }
}

render(
  <HelloWorld/>,
  document.getElementById('app')
)
