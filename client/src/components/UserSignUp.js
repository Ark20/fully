import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
export default class UserSignIn extends Component{
  
  constructor(props) {

    super(props)
    this.state = {
      matching:true
    }
    this.signIn = props.signIn
    this.handleInput = this.handleInput.bind(this)
    this.pwCheck = this.pwCheck.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)


  }
 
  handleSubmit(e){

    e.preventDefault()

const form = {"firstName":this.state.firstName,
"lastName":this.state.lastName, "password":this.state.password, "emailAddress":this.state.emailAddress}

fetch("http://localhost:5000/api/users",{
  method:'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify(form)
}
).then(response=>{
  if(response.ok){
    this.signIn(this.state.emailAddress,this.state.password)
    console.log(this.signIn)
    window.location="/courses" 

  }else{
    if(response.status===400){
      let apiError = response.json()
       return apiError
     }
  }
}).then( apiError => {
  console.log(apiError)
  this.setState({
    error:"true"
  })
}) 


  }

  handleInput(e){
    const target = e.target
    const name = target.name
    const value = target.value
    
    
    this.setState({
      [name]: value

    })
  }
//action="http://localhost:5000/api/users" method="post" 
  pwCheck(e){
    if(this.state.password){
  if(!(this.state.password ===e.target.value)){
   //set state property to conditionally render passwords don't match
   this.setState({
     matching: false
   })
  } else {
    this.setState({
      matching: true
    })
  }

}
  }

    render(){

    return(
      
        <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
        {this.state.error ?
            <div className="validation-errors">Please make sure each field has a value</div>:""}

          <form id="form" onChange={this.handleInput} onSubmit={this.handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" className placeholder="First Name"  value={this.state.firstName} /></div>
            <div><input id="lastName" name="lastName" type="text" className placeholder="Last Name" value={this.state.lastName} /></div>
            <div><input id="emailAddress" name="emailAddress" type="text" className placeholder="Email Address" value={this.state.emailAddress} /></div>
            <div><input id="password" name="password" type="password" className placeholder="Password" value={this.state.password} /></div>
            {this.state.matching ? <span></span>:  <span>Passwords don't match</span>}
            <div><input id="confirmPassword" name="confirmPassword" type="password" className placeholder="Confirm Password" onChange={this.pwCheck} value={this.state.confirmPassword}/></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" ><NavLink to="/courses">Cancel</NavLink></button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <a href="/courses/signin">Click here</a> to sign in!</p>
      </div>

    )

    }
}



