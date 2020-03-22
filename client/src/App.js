
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
    Redirect,

} from 'react-router-dom'
import {
  useHistory,
  useLocation,
} from 'react-router'
import { Base64 } from 'js-base64';
import {Provider} from './components/Context'
//import { strict } from 'assert';


//private route for course creation & update 
function PrivateRoute({ authed,children, ...rest }) {
console.log(authed)
  return (
  <Route 
    {...rest}
    render ={()=>
      authed ? ( //if authenticated render child component 
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
      authed:false
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
    

    this.setState({
      name:emailAddress,
      pass:password,
      authed: true
    })
    //useHistory().replace(from);
    console.log(this.state.authed)
  })

  //if authed store email and name to state 
  
}

signOut=() => {
  this.setState({
    name:"nnn",
    pass:"nnn",
    authed: false,
  })
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
      <Route path ="/courses/:id/update" component={({match}) => <UpdateCourse />}></Route>
      <Route exact path ="/courses/signin" component={() => <Sign_in />}></Route>
      <Route path ="/courses/signup" component={() => <Sign_up />}></Route>
      <Route path ="/courses/signout" component={() => <UserSignOut />}></Route>
      <Route exact path ="/courses/:id" component={({match}) => <CourseDetail id={match.params.id} />}></Route>
      
      </Switch>
         
      </div></Provider>
   </BrowserRouter>
    );

  }
}


