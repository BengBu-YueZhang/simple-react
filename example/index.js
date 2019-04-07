import { h, render, Component } from '../src'

class ListItem extends Component {
  render () {
    const { value = '默认' } = this.props
    return (
      <div>{ value }</div>
    )
  }
}

class HelloWorld extends Component {

  constructor (props) {
    super(props)
    this.state = {
      list: [
        {
          value: '1'
        }
      ]
    }
  }

  handleAdd () {
    let list = this.state.list
    list.push({
      value: list.length + 1
    })
    this.setState({
      list
    })
  }

  handleSubtract () {
    let list = this.state.list
    list.length = list.length - 1
    this.setState({
      list
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handleAdd.bind(this)}>+</button>
        <button onClick={this.handleSubtract.bind(this)}>-</button>
        <div>
          {
            this.state.list && this.state.list.map(item => {
              return (
                <ListItem value={item.value}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

render(
  <HelloWorld/>,
  document.getElementById('app')
)
