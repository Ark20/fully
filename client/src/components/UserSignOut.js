import React from 'react'
import { Redirect}  from 'react-router-dom'

function UserSignOut({signOut}){
  //call signout function 
signOut()
  
  
  return(
<Redirect//talke user back to home page 
          to={{
            pathname:"/"
          }}
        />
  )

  
}

export default UserSignOut










