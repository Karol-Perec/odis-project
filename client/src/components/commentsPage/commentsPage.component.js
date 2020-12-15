import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../../styles/index.css';
import AddCommentForm from './addCommentForm.component';
import CommentsList from './commentsList.component';

function CommentsPage(props) {
  const [commentsListState, setCommentsListState] = useState([]);

  useEffect(() => {
    refreshCommentsList();
  }, []);

  function refreshCommentsList() {
    axios.get('/api/comments/get').then(res => {
      setCommentsListState(res.data);
    });
  }

  return (
    <div className="comments-page">
      <AddCommentForm
        refreshCommentsList={refreshCommentsList}></AddCommentForm>
      <CommentsList
        commentsList={commentsListState}
        isSecure={props.isSecure}></CommentsList>
    </div>
  );
}

export default CommentsPage;
