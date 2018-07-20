import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleSaveAnswer } from '../actions/questions'

class QuestionPage extends Component {
  state = {
    answer: null
  }
  handleChange = (e) => {
    const answer = e.target.value
    this.setState(() => ({
      answer
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { dispatch, qid, authedUser } = this.props

    dispatch(handleSaveAnswer({ authedUser, qid, answer }))
    
  }
  render () {
    const { question, authedUser } = this.props

    if (question === null) {
      return <p>This question doesn't exist.</p>
    }

    const {
      name, avatar, hasAnswered, optionOne, optionTwo
    } = question

    return (
      <div className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
          width='100'
          height='100'
        />
        <p>Author: {name}</p>
        <hr />
        <p>Would You Rather</p>
        {hasAnswered
          ? <div className='vote-result'>
              <p>{optionOne.text}.   ({Math.floor((optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length)) * 100)}%  voted) {optionOne.votes.includes(authedUser) ? '\u25c0 YOUR CHOICE' : null}</p>
              <br />
              <p>{optionTwo.text}.   ({Math.floor((optionTwo.votes.length / (optionOne.votes.length + optionTwo.votes.length)) * 100)}%  voted) {optionTwo.votes.includes(authedUser) ? '\u25c0 YOUR CHOICE' : null}</p>
            </div>
          : <form className='vote' onSubmit={this.handleSubmit}>
              <p>
                <input type='radio' name='answer' value='optionOne' onChange={this.handleChange} /> {optionOne.text} 
                <br />
                <input type='radio' name='answer' value='optionTwo' onChange={this.handleChange} /> {optionTwo.text}
                <br />
              </p>
              
              <button className='btn' type='submit'>
                Vote
              </button>
            </form>}
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, props) {
  const { id } = props.match.params
  const question = questions[id]
  const qid = id
  const author = question ? users[question.author] : null
  return {
    qid,
    authedUser,
    question: question
      ? formatQuestion(question, author, authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionPage)
