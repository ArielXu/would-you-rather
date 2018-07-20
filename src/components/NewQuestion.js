import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }
  handleChangeOptionOne = (e) => {
    const optionOneText = e.target.value
    this.setState(() => ({
      optionOneText
    }))
  }
  handleChangeOptionTwo = (e) => {
    const optionTwoText = e.target.value
    this.setState(() => ({
      optionTwoText
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { authedUser, dispatch  } = this.props
    const author = authedUser
    dispatch(handleAddQuestion({ optionOneText, optionTwoText, author}))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: ''
    }))
  }
  render () {
    const { optionOneText, optionTwoText } = this.state
    return (
      <div className='new-question'>
        <p>Add New Question: Would you rather</p>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <textarea 
            placeholder='Option one'
            value={optionOneText}
            onChange={this.handleChangeOptionOne}
            className='textarea'
            maxLength={280}
          /> 
          <p id='question-mark'>?</p>
          <br />
          <textarea 
            placeholder='Option two'
            value={optionTwoText}
            onChange={this.handleChangeOptionTwo}
            className='textarea'
            maxLength={280}
          />
          <p id='question-mark'>?</p>
          <br />
          <button className='btn' type='submit'>
            Add Question
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
