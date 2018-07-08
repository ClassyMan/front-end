import {headerSettings} from './HttpSettings.js';

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
    });
  }

  export function updateComment(component, state, comment, discussionId) {

    fetch('http://localhost:8080/comments/update', {
      method: 'POST',
      headers: headerSettings,
      body: JSON.stringify(comment)
    }).then((res) => {
      return res.text();
    }).then((text) => {
      var retreived = text.length ? JSON.parse(text) : {};
      component.setState({editingComment: false,
                          comments: [retreived].concat(state.comments)});
    });
  }
