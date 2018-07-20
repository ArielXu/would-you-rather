import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Link, withRouter } from 'react-router-dom'

class LoginStatus extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }

  render () {
    const { authedUser, users } = this.props
    return (
      <div className='login-status'>
        {authedUser === null
          ? null
          : <div className='log-out'>
              <img
                src={users[authedUser].avatarURL}
                alt={`Avatar of ${users[authedUser].name}`}
                className='avatar'
                width='50'
                height='50'
              />
              <p>Hi, {users[authedUser].name}</p>
              <button className='btn' onClick={this.handleLogOut}>
                Log out
              </button>
            </div>}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default withRouter(connect(mapStateToProps)(LoginStatus))
