import React from 'react';
import logo from './logo.svg';
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
      
         
        </header>
      </div>
    );

  }
}


