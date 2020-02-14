import React from 'react';
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import Sign_in from './components/UserSignIn'
import Sign_up from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import UpdateCourse from './components/UpdateCourse'
import CreateCourse from './components/CreateCourse'
import './App.css';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import { Base64 } from 'js-base64';

/** 

function PrivateRoute({ children, ...rest }){
  return (
    <Route render={({ location }) => 
    fakeAuth.isauthed ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    )
  }/>
  )

}
*/
export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      holder:[]
    }
  
  }

componentDidMount(){
  this.getData()
  this.signIn("bob","bob")
}





signIn=(emailAddress,password) => {
  let email = emailAddress; 
  let pass = password;
  //pass auth header to this call 
  //make request to api with auth header using email and pass defined above
  fetch(`http://localhost:5000/api/users`, {
    headers: new Headers({
      "Authorization": `Basic ${Base64.encode(`${email}:${pass}`)}`
    }),
  }).then(response => {
    if(!response.ok) throw new Error(response.status)
    return response.json()
  })

  //if authed store email and name to state 
  
}

signOut=() => {

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

      <div className="App">
      <Header></Header>

      <Switch>
      <Route exact path ="/courses" component={() => <Courses data ={this.state.holder}/>}></Route>
      <Route path ="/courses/create" component={() => <CreateCourse />}></Route>
      <Route path ="/courses/:id/update" component={({match}) => <UpdateCourse />}></Route>
      <Route path ="/courses/:id" component={({match}) => <CourseDetail id={match.params.id} />}></Route>
      <Route path ="/courses/signin" component={() => <Sign_in />}></Route>
      <Route path ="/courses/signup" component={() => <Sign_up />}></Route>
      <Route path ="/courses/signout" component={() => <UserSignOut />}></Route>
      </Switch>
         
      </div>
   </BrowserRouter>
    );

  }
}


