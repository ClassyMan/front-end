import {headerSettings} from './HttpSettings.js';

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
