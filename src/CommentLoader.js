import {headerSettings} from './HttpSettings.js';

  export function loadCommentsForDiscussionUsingUser(component, discussionId, username) {
    console.log('Loading comments for discussion: ' + discussionId);
    fetch('http://localhost:8080/comments/fetchCommentsForDiscussionUsingUser', {
        method: 'POST',
        headers: headerSettings,
        body: JSON.stringify({
          discussionId: discussionId,
          username: username
        })
      }
    )
    .then((res) => {
       console.log('response received');
       var text = res.text();
       console.log('result: ' + text);
       return text;
    })
    .then((text) => {
       console.log('parsing json: ' + text);
       var retreived = text.length ? JSON.parse(text) : {};
       component.setState({comments: retreived})
    });
  }

  export function loadAllCommentsForDiscussion(component, discussionId) {
    console.log('Loading comments for discussion: ' + discussionId);
    fetch('http://localhost:8080/comments/fetchCommentsForDiscussion', {
        method: 'POST',
        headers: headerSettings,
        body: JSON.stringify({
          discussionId: discussionId
        })
      }
    )
    .then((res) => {
       console.log('response received');
       var text = res.text();
       console.log('result: ' + text);
       return text;
    })
    .then((text) => {
       console.log('parsing json: ' + text);
       var retreived = text.length ? JSON.parse(text) : {};
       component.setState({comments: retreived})
    });
  }

  export function loadDiscussion(component, discussionId) {
    fetch('http://localhost:8080/discussions/fetchDiscussionById', {
        method: 'POST',
        headers: headerSettings,
        body: JSON.stringify({
          discussionId: discussionId
        })
      }
    )
    .then((res) => {
       console.log('response received');
       var text = res.text();
       console.log('result: ' + text);
       return text;
    })
    .then((text) => {
       console.log('parsing json: ' + text);
       var retreived = text.length ? JSON.parse(text) : {};
       component.setState({title: retreived.title,
                      summary: retreived.summary})
    });
  }
