import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
class MainPage extends React.Component {
  render () {
    return (
      <div >
        Main Page
        <br/>
        <Link
          className={classNames('nav-link')}
          to={'/login'} 
        > 
          <Button variant="contained">
          Turn to Login Page
          </Button>
        </Link>
      </div>
    )
  }
}

export default MainPage
