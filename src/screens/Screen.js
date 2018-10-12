import {Component} from 'react'

export default class Screen extends Component {
  startLoading = (r) => {
    this.setState({loading: true})
    return r
  }

  stopLoading = (r) => {
    this.setState({loading: false})
    return r
  }

  onError = (e) => {
    console.error(e)
    this.stopLoading()
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value

    this.setState({[id]: value})
  }
}
