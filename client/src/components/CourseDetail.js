import React, {Component} from 'react'
import Cookies from 'js-cookie'
let cookies = Cookies


export default class CourseDetail extends Component{
  

  
  constructor(){
    super()
    this.state = {
      holder:[]
    }
  
  }




  componentDidMount(){
let id = this.props.id
console.log(id)

fetch(`http://localhost:5000/api/courses/${id}`).then(response=> response.json())
    .then(response =>{ 
       this.setState({
         holder: response
       }) 


    })
  }




    render(){
    return(
      <div>
        <div class="actions--bar">
          <div class="bounds">{ cookies.get("authed") ?
            <div class="grid-100"><span><a class="button" href="/courses">Update Course</a><a class="button" href="#">Delete Course</a></span><a
                class="button button-secondary" href="/courses">Return to List</a></div> : <span></span>
          }
          </div>
        </div>
        <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{this.state.holder.title}</h3>
            <p>{this.state.holder.author}</p>
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
      </div>
    )

    }
}