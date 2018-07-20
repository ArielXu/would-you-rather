import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function saveAnswer ({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER,
    qid,
    authedUser,
    answer
  }
}

export function handleSaveAnswer (info) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(saveAnswer(info))

    return saveQuestionAnswer(info)
      .then(() => dispatch(hideLoading()))
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (info) {
  return (dispatch) => {
    dispatch(showLoading())

    return saveQuestion(info)
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}