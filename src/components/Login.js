import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component { 
  state = {
    authedU: null
  }
  handleChange = (e) => {
    const authedU = e.target.value
    this.setState(() => ({
      authedU
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { authedU } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(authedU))

    this.setState(() => ({
      authedU: null
    }))
  }
  render () {
    return (
      <div className='login'>
        <h3 className='center'>Please select the user you would like to login.</h3>
        <form className='login' onSubmit={this.handleSubmit}>
          <p className='center'>Only logged users can vote, submit new questions or view leaderboards.</p>
          <select onChange={this.handleChange} defaultValue='blank'>
            <option disabled value='blank'> -- select a user -- </option>
            {this.props.usersDetail.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button className='btn' type='submit'>
            Login
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    usersDetail: Object.values(users).map((user) => {
      return ({
        id: user.id,
        name: user.name
      })
    }),
  }
}
export default connect(mapStateToProps)(Login)
