import React from 'react'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
class Login extends React.Component {
  render () {
    return (
      <div>
        <div><Link to={{pathname: '/signup', state: this.props.store}}>Signup</Link></div><div><Link to='/login/'>Login</Link></div>
      </div>
    )
  }
}

export default class SignIn extends React.Component {
  logout (ev){
    ev.preventDefault()
    this.props.store.dispatch({type: "update", name: "name", value: undefined})
    browserHistory.push("/")
  }
  render () {
    return (
      <div className="login">
        {this.props.store.getState().name ? <div><a href="#" onClick={this.logout.bind(this)}>Logout</a></div> : <Login store={this.props.store}/>}
      </div>
    )
  }
}
