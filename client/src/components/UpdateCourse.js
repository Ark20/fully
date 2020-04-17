import React, {Component} from 'react'
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie'
let cookies = Cookies

export default class UpdateCourse extends Component{

  componentDidMount(){
    let id = this.props.id
    let bug=cookies.get("courseDeets")
    console.log(typeof bug)
  }
  constructor(props) {
    super(props)
    this.state={
      '':"",
      titleEr : false,
      desc : false
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)


  }
  handleInput(e){

    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      
      [name]:value

    })
    console.log(this.state)
  }
  
//when form is submitted post course with put request 
handleSubmit(e){
console.log(e)
  e.preventDefault()

const form = {"user": cookies.get('id'),"title":this.state.title,
"estimatedTime":this.state.estimatedTime, "materialsNeeded":this.state.materialsNeeded, "description":this.state.description}
let emailAddress = cookies.get("name")
let password = cookies.get("pass")

let id = this.props.id

fetch(`http://localhost:5000/api/courses/${id}`,{
  method:'PUT',
  headers: new Headers({
    "Authorization": `Basic ${Base64.encode(`${emailAddress}:${password}`)}`,
    'Content-type': 'application/json' 
  }),
  body: JSON.stringify(form)
},


).then((response) => {
  //create error message and redirect user 
  if(response.status===400){
   let apiError = response.json()
    return apiError
  }
  window.location = "/courses"

  console.log(response)
}).then( apiError => {
  console.log(apiError)

  if(apiError.error.message.split(" ").includes('description:')){
    this.setState({
      desc: true
    })

  } else if(apiError.error.message.split(" ").includes('title:')){
    this.setState({
     titleEr: true
    })
  }
}) 



    
  }

    render(){
    return(
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <div id="formHolder">
          {this.state.titleEr||this.state.desc ? <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {this.state.titleEr?
                <li>Please provide a value for "Title"{this.state.titleEr}</li> :""}

                {this.state.desc ?
                <li>Please provide a value for "Description" + {this.state.desc}</li>:""}
              </ul>
            </div>
          </div> : ""}
        
          <form onChange={this.handleInput} onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" defaultValue={JSON.parse(cookies.get("courseDeets")).title} value={this.state.title} /></div>
                <p>Description</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description"  defaultValue={JSON.parse(cookies.get("courseDeets")).description}  value={this.state.description} /></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={JSON.parse(cookies.get("courseDeets")).estimatedTime}  value={this.state.estimatedTime} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded"  defaultValue={JSON.parse(cookies.get("courseDeets")).materialsNeeded}  value={this.state.materialsNeeded} /></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button type="button" className="button button-secondary" onClick={()=>window.location.href=`/courses/${this.props.id}`}>Cancel</button></div>
          </form>
        </div>
      </div>
      </div>
    )

    }
}