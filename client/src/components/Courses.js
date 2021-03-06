import React from 'react'

//export default class Courses extends Component{
const Courses = props => {
           //map over items in array, create divs for each with info from each item 
    var courseList;
    courseList = props.data.map((course,index) =>
    <div className="grid-33" key={index}><a className="course--module course--link" href={`/courses/${props.data[index]._id}`}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </a></div>
    )
    

    return(
        <div>
        <div className="bounds">
            {courseList}
            <div className="grid-33"><a className="course--module course--add--module" href="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>New Course</h3>
          </a></div></div>
</div>
    )

    
}

export default Courses