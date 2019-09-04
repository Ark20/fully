import React, {Component} from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'


export default class CourseDetail extends Component{
  

  
  constructor(){
    super()
    this.state = {
      holder:[]
    }
  
  }




  componentDidMount(){
let id = this.props.id
fetch(`http://localhost:5000/api/courses/${id}`).then(response=> response.json())
    .then(response =>{ 
       this.setState({
         holder: response
       }) 

       console.log(this.props.id)

    })
  }




    render(){
    return(
        <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{this.state.holder.title}</h3>
            <p>By Joe Smith</p>
          </div>
          <div className="course--description">
           <p>{this.state.holder.description} </p>
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>{this.state.holder.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>{this.state.holder.materialsNeeded}</h4>
                <ul>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>  
    )

    }
}