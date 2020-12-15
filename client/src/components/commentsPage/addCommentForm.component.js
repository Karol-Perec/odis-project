import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../../styles/index.css';

function AddCommentForm(props) {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="comments-form">
      <input
        value={username}
        type="text"
        placeholder="Username"
        onChange={usernameChange}
      />
      <textarea
        value={content}
        type="text"
        placeholder="Enter your comment here..."
        onChange={contentChange}
      />
      <button onClick={addComment}>Add comment</button>
    </div>
  );

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function contentChange(e) {
    setContent(e.target.value);
  }

  function addComment(e) {
    if (!username || !content) {
      alert('Fields cannot be blank');
    } else {
      const comment = {
        username: username,
        content: content,
      };

      axios
        .post('/api/comments/add', comment)
        .then(() => props.refreshCommentsList());
    }
  }
}

export default AddCommentForm;
