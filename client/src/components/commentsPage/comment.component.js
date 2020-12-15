import React from 'react';
import '../../styles/index.css';

function Comment(props) {
  let contentSection = props.isSecure ? (
    <p>{props.content}</p>
  ) : (
    <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
  );
  
  return (
    <div className="comment">
      <div>{props.username}</div>
      {contentSection}
    </div>
  );
}

export default Comment;
