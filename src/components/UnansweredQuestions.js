import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class UnansweredQuestions extends Component {
  render () {
    const { unansweredQuestions } = this.props
    return (
      <div className='unanswered-questions'>
        <h2 className='center'>Questions you have not answered</h2>
        <ul className='unanswered-questions-list'>
          {unansweredQuestions.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  const user = users[authedUser]
  const answeredQuestions = user ? Object.keys(user.answers) : null
  return {
    unansweredQuestions: Object.keys(questions).filter((question) => {
      return !(answeredQuestions.includes(question))
    })
  }
}

export default connect(mapStateToProps)(UnansweredQuestions)
