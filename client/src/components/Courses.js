import React, {Component} from 'react'

//export default class Courses extends Component{
const Courses = props => {
           //map over items in array, create divs for each with info from each item 
           var courseList;
    courseList = props.data.map((course,index) =>
    <div className="grid-33"><a className="course--module course--link" href="course-detail.html">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </a></div>
    )
    

    return(
        <div className="bounds">
     
        </div>

    )

    
}

export default Courses