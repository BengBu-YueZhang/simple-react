import { h, render } from '../src'

render(
  <div>
    <h1 id="title" style="color: blue">hello world</h1>
    <h1 id="title" style="color: red">hello world</h1>
  </div>,
  document.getElementById('app')
)
