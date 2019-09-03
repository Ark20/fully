import React, {Component} from 'react'

export default class CourseDetail extends Component{
    render(){
    return(
        <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">Build a Basic Bookcase</h3>
            <p>By Joe Smith</p>
          </div>
          <div className="course--description">
            <p />
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                <h4>Estimated Time</h4>
                <h3>14 hours</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
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