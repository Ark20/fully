import React from 'react';
import Header from './components/Header'
import Courses from './components/Courses'
//import Sign_in from './components/Sign_in'
//import CreateCourse from './components/CreateCourse'
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
          <Courses data = {this.state.holder}></Courses>

      <Switch>
      <Route></Route>
      </Switch>
         
      </div>
   </BrowserRouter>
    );

  }
}


