import React, { Component } from 'react'
import AnsweredQuestions from './AnsweredQuestions'
import UnansweredQuestions from './UnansweredQuestions'

class Questions extends Component {
  state = {
    showUnanswered: true
  }
  handleSwitchToUnanswered = (e) => {
    e.preventDefault()
    this.setState((() => ({
      showUnanswered: true
    })))
  }
  handleSwitchToAnswered = (e) => {
    e.preventDefault()
    this.setState((() => ({
      showUnanswered: false
    })))
  }
  render () {
    return (
      <div className='questions-list'>
        <button className='btn' id='switch' onClick={this.handleSwitchToUnanswered}>
          Unanswered Questions
        </button>
        <button className='btn' id='switch' onClick={this.handleSwitchToAnswered}>
          Answered Questions
        </button>
        {this.state.showUnanswered
          ? <UnansweredQuestions />
          : <AnsweredQuestions />}
      </div>
    )
  }
}

export default Questions
