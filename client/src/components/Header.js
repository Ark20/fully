import React from 'react'

import Cookies from 'js-cookie'
let cookies = Cookies
//show sign out if signed in
function Header() {

        return(
            <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              {
                cookies.get("authed") ? <nav><a href="/" className="signup"> Hello {cookies.get("wholeName")}</a><a href="/signOut" className="signup">Sign Out</a> </nav>:
              <nav><a href="/courses/signUp" className="signup">Sign Up</a>
              <a className="signin" href="/signIn"  >Sign In</a></nav>
    
    
    }
            </div>
          </div>
        )
    
}

export default Header