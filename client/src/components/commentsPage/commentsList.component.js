import React from 'react';
import '../../styles/index.css';
import Comment from './comment.component';

function CommentsList(props) {
  return (
    <div className="comments-list">
      {props.commentsList.map(comment => (
        <Comment
          username={comment.username}
          content={comment.content}
          key={comment._id}
          isSecure={props.isSecure}
        />
      ))}
    </div>
  );
}

export default CommentsList;
