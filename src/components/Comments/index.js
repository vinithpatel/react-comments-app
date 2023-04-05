import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onClickAddComment = event => {
    event.preventDefault()
    this.setState(prevState => {
      const newComment = {
        id: uuidv4(),
        name: prevState.name,
        comment: prevState.comment,
        createdAt: new Date(),
        isLiked: false,
        color: this.getRandomColor(),
      }
      return {
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }
    })
  }

  onToggleLike = id => {
    this.setState(prevState => {
      const updatedCommentsList = prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {
            ...eachComment,
            isLiked: !eachComment.isLiked,
          }
        }
        return eachComment
      })
      return {commentsList: updatedCommentsList}
    })
  }

  onDeleteComment = id => {
    this.setState(prevState => {
      const updatedCommentsList = prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      )
      return {commentsList: updatedCommentsList}
    })
  }

  getRandomColor = () => {
    const colorIndex = Math.floor(
      Math.random() * initialContainerBackgroundClassNames.length,
    )

    const color = initialContainerBackgroundClassNames[colorIndex]

    return color
  }

  render() {
    const {name, comment, commentsList} = this.state
    const commentsCount = commentsList.length

    return (
      <div className="bg-container">
        <h1 className="main-heading">Comments</h1>
        <div className="input-comment-container">
          <div className="comments-image-container">
            <img
              className="comments-image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <form className="input-container">
            <p className="topic">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="input-name"
              value={name}
              onChange={this.onChangeName}
            />
            <textarea
              className="input-comment"
              placeholder="Your Comment"
              onChange={this.onChangeComment}
              value={comment}
            >
              {comment}
            </textarea>
            <button
              className="add-comment-button"
              type="submit"
              onClick={this.onClickAddComment}
            >
              Add comment
            </button>
          </form>
        </div>
        <hr className="harizental-rule" />
        <div className="comments-count-card">
          <span className="comments-count">{commentsCount}</span>
          <p className="comments-heading">Comments</p>
        </div>

        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              onToggleLike={this.onToggleLike}
              onDeleteComment={this.onDeleteComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
