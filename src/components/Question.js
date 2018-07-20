import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  render () {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist.</p>
    }

    const {
      name, id, avatar, optionOne, optionTwo
    } = question

    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
          width='100'
          height='100'
        />
        <p>Author: {name}</p>
        <hr />
        <p>Would You Rather
          <br />
          {optionOne.text}?
          <br />
          {optionTwo.text}?</p>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const author = question ? users[question.author] : null
  return {
    authedUser,
    question: question
      ? formatQuestion(question, author, authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))
