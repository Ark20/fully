import React, {Component} from 'react'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64';

let cookies = Cookies


export default class CourseDetail extends Component{

  
  constructor(){
    super()
    this.emailAddress= cookies.get("name")
    this.password= cookies.get("pass")

    this.delete = function (id) {
      console.log(this.emailAddress)
      console.log(this.password)

             fetch(`http://localhost:5000/api/courses/${id}`, {
              method: 'delete',
              headers: new Headers({
                "Authorization": `Basic ${Base64.encode(`${this.emailAddress}:${this.password}`)}`
              }),
            },)
    }
    this.state = {
      holder:[]
    }
  
  }



  componentDidMount(){
let id = this.props.id

fetch(`http://localhost:5000/api/courses/${id}`).then(response=> response.json())
    .then(response =>{ 
      console.log(response.user)
      console.log(cookies.get("id"))

       this.setState({
         holder: response,
         id: id
       }) 


    })
  }



    render(){
    return(
      <div>
        <div class="actions--bar">
          <div class="bounds">{ cookies.get("id") === this.state.holder.user ?
            <div class="grid-100"><span><a class="button" href={`/courses/${this.state.id}/update`}>Update Course</a><button class="button" onClick={()=> this.delete(this.state.id)}>Delete Course</button></span><a
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