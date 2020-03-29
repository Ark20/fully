import React from 'react';
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import SignIn from './components/UserSignIn'
import SignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import UpdateCourse from './components/UpdateCourse'
import CreateCourse from './components/CreateCourse'
import './App.css';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,

} from 'react-router-dom'

import { Base64 } from 'js-base64';
import {Provider} from './components/Context'
import Cookies from 'js-cookie'
import { strict } from 'assert';
let cookies = Cookies

//import { strict } from 'assert';


//private route for course creation & update 
function PrivateRoute({ authed,children, ...rest }) {
console.log(cookies.get("authed"))
  return (
  <Route 
    {...rest}
    render ={()=>
      cookies.get("authed") ? ( //if authenticated render child component 
        children
      ) : (//if not redirect to signIn 
        <Redirect
          to={{
            pathname:"/courses/signin"
          }}
        />

      )
    }  
    />
    )
}

export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      holder:[],
      name:"",
      pass:"",
      authed: cookies.get("authed")
    }
  
  }

componentDidMount(){
  this.getData()
  //this.signIn("bob","bob")
  //this.signOut()
}





signIn=(emailAddress,password) => {


  //pass auth header to this call 
  //make request to api with auth header using email and pass defined above
  fetch(`http://localhost:5000/api/users`, {
    headers: new Headers({
      "Authorization": `Basic ${Base64.encode(`${emailAddress}:${password}`)}`
    }),
  }).then(response => {
    if(!response.ok){ 
      this.setState({
        authed: false
      })
      throw new Error(response.status)}
    return response.json()
  }).then(response=>{
console.log(response._id)
    cookies.set("authed", true, {path: "/"})
    cookies.set("name", emailAddress, {path: "/"})
    cookies.set("pass", password, {path: "/"})
    cookies.set("id", response._id, {path: "/"})


    this.setState({
      name:emailAddress,
      pass:password
    })
    
    //useHistory().replace(from);
    console.log()
  })

  //if authed store email and name to state 
  
}

signOut=() => {
  this.setState({
    name:"nnn",
    pass:"nnn",
    authed: false,
  })
  cookies.remove('authed')

  //remove current user from state 
}

getData =()=>{
  fetch(`http://localhost:5000/api/courses`).then(response=> response.json())
  .then(response =>{ 
     this.setState({
       holder: response
     }) 
  })
  
  //.then(response => console.log(response))

}
  render(){

    return (
      <BrowserRouter>
<Provider value={{
  authed: this.state.authed, 
  email: this.state.email,
  pass: this.state.pass,
  actions: {
    signOut: this.signOut,
    signIn: this.signIn
  }
}}>
      <div className="App">
      <Header></Header>

      <Switch>
      <Route exact path ="/courses" component={() => <Courses data ={this.state.holder}/>}></Route>
      <PrivateRoute path="/courses/create" authed={this.state.authed}><CreateCourse/></PrivateRoute>
      <PrivateRoute path="/courses/:id/update" authed={this.state.authed}><UpdateCourse/></PrivateRoute>
      <Route exact path ="/courses/signin" component={() => <SignIn />}></Route>
      <Route exact path ="/courses/signup" component={() => <SignUp />}></Route>
      <Route path ="/courses/signout" component={() => <UserSignOut signOut = {this.signOut}/>}></Route>
      <Route exact path ="/courses/:id" component={({match}) => <CourseDetail id={match.params.id} />}></Route>
      
      </Switch>
         
      </div></Provider>
   </BrowserRouter>
    );

  }
}


