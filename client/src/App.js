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
    Switch
} from 'react-router-dom'


export default class App extends React.Component {

  constructor(){
    super()
    this.state = {
      holder:[]
    }
  
  }

componentDidMount(){
  this.getData()
}

getData =()=>{
  fetch(`http://localhost:5000/api/courses`).then(response=> response.json())
  .then(response =>{ 
     this.setState({
       holder: response
     }) 
    console.log(this.state.holder)
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
      <Route path ="/courses/:id/update" component={() => <UpdateCourse />}></Route>
      <Route path ="/courseDetail" component={() => <CourseDetail data ={this.state.holder}/>}></Route>
      <Route path ="/courses/signin" component={() => <Sign_in />}></Route>
      <Route path ="/courses/signup" component={() => <Sign_up />}></Route>
      <Route path ="/courses/signout" component={() => <UserSignOut />}></Route>
      </Switch>
         
      </div>
   </BrowserRouter>
    );

  }
}


