import React, {Component} from 'react'
import { NavLink}  from 'react-router-dom'

import Cookies from 'js-cookie'
let cookies = Cookies
//show sign out if signed in
export default class Header extends Component {

    render(){
        return(
            <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              {
                cookies.get("authed") ? <><a className="signup">{cookies.get("wholeName")}</a><nav><NavLink to="/signOut"><a className="signup">Sign Out</a></NavLink></nav> </>:
              <nav><NavLink to="/courses/signup"><a className="signup">Sign Up</a></NavLink>
              <NavLink to="/signin"><a className="signin" >Sign In</a></NavLink></nav>
    
    
    }
            </div>
          </div>
        )
    }
}