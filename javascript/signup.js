import React from 'react'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
export default class SignUp extends React.Component {

  updateField (ev)  {
    this.props.store.dispatch({type: "update", name: ev.target.name, value: ev.target.value})
  }
  submitForm (ev) {
    ev.preventDefault();
    browserHistory.push('/sandbox')
  }
  render () {
    return (
      <form>
        <input name="name" type="text" onChange={this.updateField.bind(this)} />
        <input name="email" type="email" onChange={this.updateField.bind(this)} />
        <input type="submit" onClick={this.submitForm}/>
      </form>
    )
  }
}
