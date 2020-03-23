import React, {Component} from 'react'
import { Consumer } from './Context'
import { NavLink}  from 'react-router-dom'

export default class UserSignIn extends Component{

  prev = (e) =>{
    e.preventDefault()
  }
    render(){
    return(<Consumer>{context => (
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.prev}>
              <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" defaultValue /></div>
              <div><input id="password" name="password" type="password" className placeholder="Password" defaultValue /></div>
              <div className="grid-100 pad-bottom"><NavLink to="/courses"><button className="button" type="submit"  onClick={() => context.actions.signIn(document.getElementById("emailAddress").value,document.getElementById("password").value)}>Sign In</button></NavLink><button className="button button-secondary" href="/courses"><NavLink to="/courses">Cancel</NavLink></button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/courses/signup">Click here</a> to sign up!</p>
        </div>
      </div>
      )}
</Consumer>
    )

    }
}