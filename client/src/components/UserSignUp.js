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
 //function to post new users to db on submit 
  handleSubmit(e){

    e.preventDefault()
//store form data in variable 
const form = {"firstName":this.state.firstName,
"lastName":this.state.lastName, "password":this.state.password, "emailAddress":this.state.emailAddress}

fetch("http://localhost:5000/api/users",{ //call post with user in request body
  method:'POST',
  headers: { 'Content-type': 'application/json' },
  body: JSON.stringify(form)
}
).then(response=>{
  if(response.ok){//if response is ok then sign the new user in 
    this.signIn(this.state.emailAddress,this.state.password)
    console.log(this.signIn)
    //window.location="/courses" 

  }else{//if bad response post error message
    if(response.status===400){
      let apiError = response.json()
       return apiError
     }
  }
}).then( apiError => {
  if(apiError){
   //create error string based on errors present 
  let erm = apiError.error.message.split(" ")
let possibleErrors = ["password:","firstName:","lastName:", "emailAddress:"]
let currentErrors = ""
for(let i=0; i<=possibleErrors.length;i++){
  if(erm.includes(possibleErrors[i])){
    if(possibleErrors[i]==="firstName:"){
      possibleErrors[i]="first name"
      currentErrors +=  possibleErrors[i] + " "
    }
    else if(possibleErrors[i]==="lastName:"){
      possibleErrors[i]="last name"
      currentErrors +=  possibleErrors[i] + " "
    }
    else if(possibleErrors[i]==="emailAddress:"){
      possibleErrors[i]="email address"
      currentErrors +=  possibleErrors[i] + " "
    } else{
      currentErrors +=  possibleErrors[i].substring(0,possibleErrors[i].length-1) + " "

    }
  }
}


  this.setState({
    error: currentErrors
  })
}}) 


  }

  handleInput(e){
    //when input is added check to see if passwords match 
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
            <div className="validation-errors">Please make sure to add values to these fields: {this.state.error}</div>:""}

          <form id="form" onChange={this.handleInput} onSubmit={this.handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" placeholder="First Name"  value={this.state.firstName} /></div>
            <div><input id="lastName" name="lastName" type="text"  placeholder="Last Name" value={this.state.lastName} /></div>
            <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" value={this.state.emailAddress} /></div>
            <div><input id="password" name="password" type="password" placeholder="Password" value={this.state.password} /></div>
            {this.state.matching ? <span></span>:  <span>Passwords don't match</span>}
            <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.pwCheck} value={this.state.confirmPassword}/></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" ><NavLink to="/courses">Cancel</NavLink></button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <a href="/signIn">Click here</a> to sign in!</p>
      </div>

    )

    }
}



