import React from 'react'
import SignIn from "./signin"
import SignUp from "./signup"
import ReactDOM from 'react-dom'
import LocalStorageMixin from 'react-localstorage'
import reactMixin from 'react-mixin'
import { createStore } from 'redux'
import {Fieldset, Field, createValue} from 'react-forms'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'

var initialState = JSON.parse(localStorage["state"] || "{}") || {}
function appState (state = initialState, action) {
  switch (action.type) {
  case 'update':
    state[action.name] = action.value
    return state
  default:
    return state
  }
}

let store = createStore(appState)
console.log("initial")
store.subscribe(() => {
  console.log(store.getState() )
  localStorage["state"] = JSON.stringify(store.getState())
})

class Body extends React.Component {
  render () {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       store: store
     })
    );
    return (

      <div>
      <SignIn name={this.props.name} store={store}/>
      {childrenWithProps}
      </div>
    )
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    let formValue = createValue({
      value: props.value,
      onChange: this.onChange.bind(this)
    })
    this.state = {formValue}
  }
  onChange(formValue) {
    this.setState({formValue})
  }

  render () {
    return (
      <div>
      Welcome to the page {store.getState().name}, you are logged in!
      Pick your favourite colour!
      <Fieldset formValue={this.state.formValue}>
        <Field select="firstName" label="First name" />
        <Field select="lastName" label="Last name" />
      </Fieldset>
      </div>
    )
  }
}

class Home extends React.Component {
  render () {
    return (
      <div>{store.getState().name ? <MainPage/> : "Please sign up or log in to the site"}</div>
    )
  }
}

class App extends React.Component {

  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/sandbox" component={Body}>
          <IndexRoute component={Home}/>
          <Route path="signup" component={SignUp} />
        </Route>
      </Router>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
reactMixin(App.prototype, LocalStorageMixin);
