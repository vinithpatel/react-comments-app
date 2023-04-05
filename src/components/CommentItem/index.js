import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, onToggleLike, onDeleteComment} = props

  const {id, name, comment, createdAt, isLiked, color} = commentDetails
  const createdAtText = formatDistanceToNow(createdAt)

  const onClickLikeButton = () => {
    onToggleLike(id)
  }

  const onClickDeleteButton = () => {
    onDeleteComment(id)
  }

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeClassName = isLiked ? 'liked-text' : 'like-text'

  return (
    <li className="comment-item">
      <div className="comment-info">
        <div className={`comment-profile ${color}`}>
          <p className="person-letter">{name[0]}</p>
        </div>
        <div className="comment-by-and-comment-text-card">
          <div className="created-by-created-at-card">
            <h1 className="comment-by">{name}</h1>
            <p className="created-at">{createdAtText} ago</p>
          </div>

          <p className="comment-text">{comment}</p>
        </div>
      </div>
      <div className="like-and-delete-container">
        <button
          className="like-button"
          type="button"
          onClick={onClickLikeButton}
        >
          <img className="like-image" src={likeImageUrl} alt="like" />
          <p className={likeClassName}>Like</p>
        </button>
        <button
          className="like-button"
          type="button"
          onClick={onClickDeleteButton}
          data-testid="delete"
        >
          <img
            className="delete-image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="harizental-rule" />
    </li>
  )
}

export default CommentItem
