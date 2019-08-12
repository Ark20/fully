import React from 'react';
import logo from './logo.svg';
import Header from './components/Header'
//import Courses from './components/Courses'
import Sign_in from './components/Sign_in'
import './App.css';


export default class App extends React.Component {

componentDidMount(){
  this.getData()
}

getData =()=>{
  fetch(`http://localhost:5000/api/courses`).then(response=> response.json())
  .then(response => console.log(response))
}
  render(){

    return (
      <div className="App">
      <Header></Header>
          <img src={logo} className="App-logo" alt="logo" />
      
         
      </div>
    );

  }
}


