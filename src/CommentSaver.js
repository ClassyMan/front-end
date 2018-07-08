import {headerSettings} from './HttpSettings.js';

  /*
   * Save a comment via http request
   */
  export function createComment(component, state, comment, discussionId) {
    let updatedParents = comment.parentIds.slice(0);
    if (comment.id) {
      updatedParents.push(comment.id);
    }

    let newComment = {
      discussionId: discussionId,
      username: localStorage.getItem('username'),
      content: state.content,
      parentIds: updatedParents,
      childeren: []
    }

    fetch('http://localhost:8080/comments/add', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify(newComment)
    }).then((res) => {
      return res.text();
    }).then((text) => {
      var retreived = text.length ? JSON.parse(text) : {};
      component.setState({addingNewComment: false,
                          comments: [retreived].concat(state.comments)});
      comment.childeren = [retreived].concat(state.comments);
    });
  }

  /*
   * Update a comment via Http request
   */
  export function updateComment(component, state, comment, discussionId) {

    comment.content = state.content;
    fetch('http://localhost:8080/comments/update', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify(comment)
    }).then((res) => {
      component.setState({editingComment: false});
    });
  }

  /*
   * Update a comment via Http request
   */
  export function deleteComment(component, state, comment, discussionId) {
    comment.content = state.content;
    fetch('http://localhost:8080/comments/delete', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify(comment)
    }).then((res) => {
      component.setState({editingComment: false,
                          isDeleted: true});
    });
  }
