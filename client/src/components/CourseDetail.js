import React, {Component} from 'react'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64';
const ReactMarkdown = require('react-markdown')

let cookies = Cookies //include cookies package to store and access current user 


export default class CourseDetail extends Component{

  
  constructor(){
    super()
    this.emailAddress= cookies.get("name")//pull user info from cookies 
    this.password= cookies.get("pass")
//function to delete courses for authorized users 
    this.delete = function (id) {
      console.log(this.emailAddress)
      console.log(this.password)
//delete request on course route
             fetch(`http://localhost:5000/api/courses/${id}`, {
              method: 'delete',
              headers: new Headers({
                "Authorization": `Basic ${Base64.encode(`${this.emailAddress}:${this.password}`)}`
              }),
            },)
            window.location = "/courses"
    }
    this.state = {
      holder:[],//will hold response from get request for user data 
      user:{},
      isLoading:true
    }
  
  }



  componentDidMount(){
let id = this.props.id//store id of current course 
//get course data and store it in state 
fetch(`http://localhost:5000/api/courses/${id}`).then(response=> response.json())
    .then(response =>{ 
       this.setState({
         holder: response,
         user: response.user,
         id: id,
         isLoading: false
       }) 
       console.log(this.state)
       console.log(cookies.get())


    })
  }



    render(){
    return(
      <div>
        <div className="actions--bar">
          <div className="bounds">{ cookies.get("id") === this.state.user._id?//conditionally render buttons for logged in users
            <div className="grid-100"><span><a className="button" href={`/courses/${this.state.id}/update`}>Update Course</a><button class="button" onClick={()=> this.delete(this.state.id)}>Delete Course</button></span><a
                className="button button-secondary" href="/courses">Return to List</a></div> :""
          } 
          </div>
        </div>
        { this.state.isloading ? <p>Courses Loading...</p>:
        <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{this.state.holder.title}</h3>
            <p>By  {this.state.user.firstName}</p>
          </div>
          
          <div className="course--description">
           <p><ReactMarkdown>{this.state.holder.description}</ReactMarkdown> </p>
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
                <ReactMarkdown>
                <h4>{this.state.holder.materialsNeeded}</h4></ReactMarkdown>
                <ul>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        </div> } 
      </div>
    )

    }
}