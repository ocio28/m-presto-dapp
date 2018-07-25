import React, {Component} from 'react'
import mprestoContract from '../contracts/MPrestoContract'

export default class ItemList extends Component {
  state = {
    items: []
  }

  componentDidMount() {
    mprestoContract.getItemsByOwner(this.props.account).then(items => this.setState({items})).catch(this.props.onError)
  }

  render() {
    return (
      <ul className="list-group">
        {this.state.items.map((item, i) => (
          <Item key={i} item={item}/>
        ))}
      </ul>
    )
  }
}

class Item extends Component {
  componentDidMount() {
    mprestoContract.getItem(this.props.item).then(console.log).catch(console.error)
  }

  render() {
    return (
      <li className="list-group-item">Comic x 3</li>
    )
  }
}
