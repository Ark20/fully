import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
export default class UserSignIn extends Component{
  
  constructor(props) {

    super(props)
    this.state = {}

    this.handleInput = this.handleInput.bind(this)
  }
  handleSubmit(e){
    e.prevemtDefault()

    fetch("http://localhost:5000/api/users",{
      method: "POST",
      body: {
        firstName:this.state.firstName,
        lastName: this.state.lastName,
        emailAddress:this.state.emailAddress,
        passwrd: this.state.password
      }
    
    })

  }
  handleInput(e){
    const target = e.target
    const name = target.name
    const value = target.value
    
    this.setState({
      [name]: value

    })
    console.log(this.state)
  }

    render(){

    return(
        <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <form  onChange={this.handleInput} onSubmit={this.handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" className placeholder="First Name"  value={this.state.firstName} /></div>
            <div><input id="lastName" name="lastName" type="text" className placeholder="Last Name" value={this.state.lastName} /></div>
            <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" value={this.state.emailAddress} /></div>
            <div><input id="password" name="password" type="password" className placeholder="Password" value={this.state.password} /></div>
            <div><input id="confirmPassword" name="confirmPassword" type="password" className placeholder="Confirm Password" value={this.state.confirmPassword}/></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" ><NavLink to="/courses">Cancel</NavLink></button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <a href="/courses/signin">Click here</a> to sign in!</p>
      </div>

    )

    }
}



