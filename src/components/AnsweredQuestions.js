import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class AnsweredQuestions extends Component {
  render () {
    const { answeredQuestions } = this.props
    return (
      <div className='answered-questions'>
        <h2 className='center'>Questions you have answered</h2>
        <ul className='answered-questions-list'>
          {answeredQuestions.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users }) {
  const user = users[authedUser]
  const answeredQuestions = user ? Object.keys(user.answers) : null
  return {
    answeredQuestions
  }
}

export default connect(mapStateToProps)(AnsweredQuestions)
