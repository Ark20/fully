import React from 'react'
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










