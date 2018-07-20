import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render () {
    const { users, userIds } = this.props
    return (
      <div className='leader-board'>
        <h3 className='center'>Leader Board</h3>
        <ul className='users--ranking-list'>
          {userIds.map((uid) => (
            <li className='user-ranking-details' key={uid}>
              <img
                src={users[uid].avatarURL}
                alt={`Avatar of ${users[uid].name}`}
                className='avatar'
                width='100'
                height='100'
              />
              <p>No.{userIds.indexOf(uid) + 1}: {users[uid].name}</p>
              <p>{Object.keys(users[uid].answers).length} answers. {Object.keys(users[uid].questions).length} questions.</p>
              <p>Total: {Object.keys(users[uid].answers).length + Object.keys(users[uid].questions).length}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
  return {
    users,
    userIds: Object.keys(users)
      .sort((a, b) => (Object.keys(users[b].questions).length + Object.keys(users[b].answers).length) - (Object.keys(users[a].questions).length + Object.keys(users[a].answers).length))
  }
}
export default connect(mapStateToProps)(LeaderBoard)
