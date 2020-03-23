import React, {Component} from 'react'
import { Consumer } from './Context'
import { Redirect}  from 'react-router-dom'

function UserSignOut({signOut}){
  
signOut()
  
  
  return(
<Redirect
          to={{
            pathname:"/courses"
          }}
        />
  )

  
}

export default UserSignOut










