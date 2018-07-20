export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo } = question
  const { avatarURL, name } = author

  return {
    name,
    id,
    avatar: avatarURL,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    optionOne,
    optionTwo
  }
}
